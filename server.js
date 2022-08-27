import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ name: "Hello world" });
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("mongodb is connnected using mongoose");
  } catch (error) {
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

app.listen(PORT, () => {
  main().catch((err) => console.log(err));
  console.log(`app is listening on ${PORT}`);
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
