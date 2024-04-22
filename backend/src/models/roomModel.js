import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 5,
  },
  players: [{ type: String }],
  currentTurn: {
    type: Number,
    default: 0,
  },
  started: {
    type: Boolean,
    default: false,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
