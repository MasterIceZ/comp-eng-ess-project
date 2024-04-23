import Player from "../models/playerModel.js";
import Room from "../models/roomModel.js";
import Bomb from "../models/bombModel.js";
import { handleCreateBomb } from "../controllers/bombController.js";

export const handleGET = async (req, res) => {
  const { name } = req.query;

  const player = await Player.find({
    name: { $regex: new RegExp(name, "i") },
  });

  res.json(player);
};

export const handleCreatePlayer = async (req, res) => {
  const player = new Player({
    name: req.body.name,
    cookie: req.body.cookie,
  });

  await player.save();

  res.json(player);
};

export const handleMovePlayer = async (req, res) => {
  console.log(req.body);
  const { cookie, x, y, roomNumber } = req.body;

  const player = await Player.findOne({ cookie });
  const room = await Room.findOne({ roomNumber });
  const currentTurnPlayer = room.players[room.currentTurn];

  console.log(player.name, currentTurnPlayer, currentTurnPlayer == player.name);

  const movable = (player, x, y, dis) => {
    return !(
      (player.x === x && player.y === y) ||
      Math.abs(player.x - x) > dis ||
      (player.x === x && Math.abs(player.y - y) > dis) ||
      (player.x !== x &&
        player.x % 2 === 0 &&
        (Math.abs(player.y - y) > dis || player.y + dis === y)) ||
      (player.x !== x &&
        Math.abs(player.x % 2) === 1 &&
        (Math.abs(player.y - y) > dis || player.y - dis === y))
    );
  };

  if (player.name === currentTurnPlayer) {
    if (!movable(player, x, y, 1)) {
      console.log("Invalid move");
      res.status(200).json({ message: "Invalid move" });
      return;
    }

    const bomb = await Bomb.findOne({ x: x, y: y, roomNumber: roomNumber });
    let playerAlive = [], countPlayerAlive = 0;
    const playerInRoom = room.players;
    for (let p = 0; p < 4; ++p) {
      const currentPlayer = await Player.findOne({ name: playerInRoom[p] });
      if (playerInRoom[p] !== currentPlayer.name && bomb && movable(currentPlayer, x, y, 1)) {
          currentPlayer.health = Math.max(0, currentPlayer.health-1);
          await currentPlayer.save();
      }
      if (currentPlayer.health > 0) countPlayerAlive++, playerAlive.push(1);
      else playerAlive.push(0);
    }
    if (bomb) {
      await Bomb.deleteOne({ x: x, y: y, roomNumber: roomNumber });
      await handleCreateBomb(roomNumber);
    }

    player.x = x;
    player.y = y;
    await player.save();

    if (countPlayerAlive == 1) {
      for (let p = 0; p < 4; ++p) {
        if (playerAlive[p]) {
          const winner = await Player.findOne({ name: playerInRoom[p] });
          winner.win = true;
          await winner.save();
        }
      }
      room.players = [];
      room.currentTurn = -1;
      await room.save();
    }

    for (let i = 0; i < 4; ++i) {
      room.currentTurn = (room.currentTurn + 1) % 4;
      if (playerAlive[room.currentTurn]) break;
    }
    await room.save();

    res.status(200).json({ player, room });
  } else {
    res.status(200).json({ message: "Not your turn" });
  }
};
