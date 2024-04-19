import express from "express";

import * as playerController from "../controllers/roomController.js";
import Room from "../models/roomModel.js";

const router = express.Router();

//router.get("/", roomController.handleGET);


router.get("/check", async (req, res) => {
    try {
      const { propertyName, propertyValue } = req.query;
      const room = await Room.findOne({ [propertyName]: propertyValue });
      res.status(200).json({ exists: !!room }); // Send true if item exists, false otherwise
    } catch (error) {
      console.error("Error checking item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

//router.post("/", roomController.handlePOST);

router.post("/create", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom); // Return the newly created room
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(400).json({ message: "Error creating room" });
  }
});

router.patch("/", roomController.handlePATCH);

export default router;
