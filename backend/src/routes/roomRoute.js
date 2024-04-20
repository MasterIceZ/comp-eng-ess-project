import express from "express";

import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.get("/check", roomController.handleCheckRoom);

router.post("/create", roomController.handleCreateRoom);

router.patch("/", roomController.handlePATCH);

export default router;
