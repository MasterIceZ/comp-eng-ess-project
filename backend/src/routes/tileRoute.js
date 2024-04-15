import express from "express";

import * as tileController from "../controllers/tileController.js";

const router = express.Router();

router.get("/", tileController.handleGET);
router.post("/", tileController.handlePOST);
router.patch("/", tileController.handlePATCH);

export default router;
