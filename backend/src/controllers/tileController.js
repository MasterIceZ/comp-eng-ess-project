import Tile from "../models/tileModel.js";

export const handleGET = async (req, res) => {
  const tile = await Tile.find();

  res.json(tile);
};

export const handlePOST = async (req, res) => {
  const tile = new Tile({
    x: req.body.x,
    y: req.body.y,
    materials: {
      wood: req.body.materials.wood ? req.body.materials.wood : 0,
      rock: req.body.materials.rock ? req.body.materials.rock : 0,
      metal: req.body.materials.metal ? req.body.materials.metal : 0,
    },
    capture: req.body.capture ? req.body.capture : null,
  });

  await tile.save();

  res.json(tile);
};

export const handlePATCH = async (req, res) => {
  const tile = await Tile.findOne({ x: req.body.x, y: req.body.y });

  if (req.body.type === "capture") {
    tile.capture = req.body.name;
  } else if (req.body.type === "construction") {
    tile.construction = req.body.name;
  }

  await tile.save();

  res.json(tile);
};
