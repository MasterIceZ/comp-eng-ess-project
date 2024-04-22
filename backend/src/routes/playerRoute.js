import express from "express";

import * as playerController from "../controllers/playerController.js";

const router = express.Router();

router.get("/", playerController.handleGET);
router.post("/create", playerController.handleCreatePlayer);
router.patch("/", playerController.handlePATCH);

export default router;
