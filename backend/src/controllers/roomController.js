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

export const handleAddPlayerToRoom = async (req, res) => {
  try {
    const { roomNumber, playerName } = req.body;

    const room = await Room.findOne({ roomNumber });
    room.players.push(playerName);

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error adding player to room:", error);
    res.status(400).json({ message: "Error adding player to room" });
  }
};

export const handleGetPlayer = async (req, res) => {
  try {
    const { roomNumber } = req.query;

    const room = await Room.findOne({ roomNumber: roomNumber });
    res.status(200).json(room.players);
  } catch (error) {
    console.error("Error getting players:", error);
    res.status(400).json({ message: "Error getting players" });
  }
};

export const handleStartGame = async (req, res) => {
  try {
    const { roomNumber } = req.body;

    const room = await Room.findOne({ roomNumber });
    room.started = true;

    const updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error starting game:", error);
    res.status(400).json({ message: "Error starting game" });
  }
};

export const handleIsGameStarted = async (req, res) => {
  try {
    const { roomNumber } = req.query;

    const room = await Room.findOne({ roomNumber });

    res.status(200).json(room.started);
  } catch (error) {
    console.error("Error checking if game started:", error);
    res.status(400).json({ message: "Error checking if game started" });
  }
};
