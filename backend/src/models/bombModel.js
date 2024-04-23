import mongoose from "mongoose";

const bombSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: String,
  },
});

const Bomb = mongoose.model("Bomb", bombSchema);

export default Bomb;
