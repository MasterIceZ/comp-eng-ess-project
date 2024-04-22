import Player from "../models/playerModel.js";
import Room from "../models/roomModel.js";

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

  if (player.name == currentTurnPlayer) {
    if (Math.abs(player.x - x) > 1 || Math.abs(player.y - y) > 1) {
      res.status(200).json({ message: "Invalid move" });
      return;
    }
    player.x = x;
    player.y = y;
    await player.save();

    room.currentTurn = (room.currentTurn + 1) % 4;
    await room.save();

    res.status(200).json({ player, room });
  } else {
    res.status(200).json({ message: "Not your turn" });
  }
};
