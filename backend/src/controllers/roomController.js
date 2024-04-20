import Room from "../models/roomModel.js";

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

export const handleCheckRoom = async (req, res) => {
  try {
    const { propertyName, propertyValue } = req.query;
    const room = await Room.findOne({ [propertyName]: propertyValue });
    res.status(200).json({ exists: !!room }); // Send true if item exists, false otherwise
  } catch (error) {
    console.error("Error checking item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleCreateRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom); // Return the newly created room
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(400).json({ message: "Error creating room" });
  }
};
