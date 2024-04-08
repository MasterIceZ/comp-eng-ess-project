import "dotenv/config";
import express from "express";

const app = express();

app.use(express.static("public"));

const PORT = process.env.FRONTEND_PORT;
app.listen(
  PORT,
  console.log(`🎉 Frontend is running on http://localhost:${PORT}`)
);
