import express from "express";

import * as bombController from "../controllers/bombController.js";

const router = express.Router();

router.get("/", bombController.handleGET);
router.post("/", bombController.handlePOST);

export default router;
