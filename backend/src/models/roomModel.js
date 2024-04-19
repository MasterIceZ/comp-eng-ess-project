import mongoose from "mongoose";
import Player from "./playerModel.js";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 5,
  },
  players: [Player.schema]
});

const Room = mongoose.model("Room", roomSchema);

export default Room;