import Player from "../models/playerModel.js";

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

export const handlePATCH = async (req, res) => {
  if (req.body.type === "attack") {
    const attacker = await Player.findOne({ name: req.body.attacker });
    const defender = await Player.findOne({ name: req.body.defender });

    if (attacker.power > defender.power) {
      defender.health -= attacker.power - defender.power;

      res.send("Attack successful");
    } else {
      attacker.health -= defender.power - attacker.power;

      res.send("Attack failed");
    }
  } else if (req.body.type === "capture") {
    const player = await Player.findOne({ name: req.body.name });
    player.tiles.push({
      x: req.body.x,
      y: req.body.y,
    });
    await player.save();
    res.json(player);
  }
};
