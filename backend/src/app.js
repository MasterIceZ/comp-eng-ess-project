import express from "express";
import cors from "cors";

import Hello from "./routes/helloRoute.js";

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
app.use("/hello", Hello);

export default app;
