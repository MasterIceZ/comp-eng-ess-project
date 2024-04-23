import express from "express";
import cors from "cors";

import Player from "./routes/playerRoute.js";
import Bomb from "./routes/bombRoute.js";
import Room from "./routes/roomRoute.js";

const app = express();

// parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// enable cors
app.use(cors());

// routes
app.use("/player", Player);
app.use("/bomb", Bomb);
app.use("/room", Room);

export default app;
