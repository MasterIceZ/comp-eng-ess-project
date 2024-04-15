import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  materials: {
    wood: {
      type: Number,
      default: 0,
    },
    rock: {
      type: Number,
      default: 0,
    },
    metal: {
      type: Number,
      default: 0,
    },
  },
  health: {
    type: Number,
    default: 20,
  },
  tiles: {
    type: Array,
    default: [],
  },
  power: {
    type: Number,
    default: 1,
  },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
