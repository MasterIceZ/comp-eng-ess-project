import Bomb from "../models/bombModel.js";
import Player from "../models/playerModel.js";

export const handleGET = async (req, res) => {
  const { roomNumber } = req.query;

  const bomb = await Bomb.find({
    roomNumber,
  });

  res.json(bomb);
};

export const handlePOST = async (req, res) => {
  const bomb = new Bomb({
    x: req.body.x,
    y: req.body.y,
  });

  await bomb.save();

  res.json(bomb);
};

export const handleCreateBomb = async (roomNumber) => {
  while (true) {
    let x = Math.floor(Math.random() * 7) - 3;
    let y = Math.floor(Math.random() * 7) - 3;
    const search = await Bomb.findOne({x:x, y:y, roomNumber: roomNumber});
    const player = await Player.findOne({x:x, y:y, roomNumber: roomNumber});
    if (search || player) continue;
    const bomb = new Bomb({ x: x, y: y, roomNumber: roomNumber });
    await bomb.save();
    break;
  }
}
