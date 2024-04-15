import express from "express";
import cors from "cors";

import Player from "./routes/playerRoute.js";
import Tile from "./routes/tileRoute.js";

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
app.use("/tile", Tile);

export default app;
