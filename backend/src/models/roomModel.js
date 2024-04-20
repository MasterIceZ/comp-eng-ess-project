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
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
