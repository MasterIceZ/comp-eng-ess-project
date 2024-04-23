import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  health: {
    type: Number,
    default: 5,
  },
  power: {
    type: Number,
    default: 1,
  },
  cookie: {
    type: String,
    required: true,
  },
  win: {
    type: Boolean,
    default: false,
  },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
