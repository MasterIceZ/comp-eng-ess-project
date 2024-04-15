import Player from "../models/playerModel.js";

export const handleGET = async (req, res) => {
  const player = await Player.find();

  res.json(player);
};

export const handlePOST = async (req, res) => {
  const player = new Player({
    name: req.body.name,
  });

  await player.save();

  res.json(player);
};
