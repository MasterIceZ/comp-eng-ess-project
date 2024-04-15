import mongoose from "mongoose";

const tileSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
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
  capture: {
    type: String,
    default: null,
  },
  construction: {
    type: String,
    default: null,
  },
});

const Tile = mongoose.model("Tile", tileSchema);

export default Tile;
