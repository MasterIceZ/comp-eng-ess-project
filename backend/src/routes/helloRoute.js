import express from "express";

import * as helloController from "../controllers/helloController.js";

const router = express.Router();

router.get("/", helloController.handleGET);
router.post("/", helloController.handlePOST);

export default router;
