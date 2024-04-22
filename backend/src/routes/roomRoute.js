import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.patch("/", roomController.handlePATCH);
router.get("/check", roomController.handleCheckRoom);
router.post("/create", roomController.handleCreateRoom);
router.post("/addPlayer", roomController.handleAddPlayerToRoom);
router.get("/player", roomController.handleGetPlayer);
router.post("/startGame", roomController.handleStartGame);
router.get("/isGameStarted", roomController.handleIsGameStarted);

export default router;
