import Room from "../models/roomModel.js";

export const handleGET = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const handlePOST = async (req, res) => {
  const room = new Room({
    roomNumber: req.body.roomNumber,
    players: req.body.players
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const handlePATCH = async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (req.body.roomNumber) {
      room.roomNumber = req.body.roomNumber;
    }

    if (req.body.players) {
      room.players = req.body.players;
    }

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//export { handleGET, handlePOST, handlePATCH };