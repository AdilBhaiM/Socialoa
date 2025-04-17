import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import postRoute from "./src/routes/post.route.js";
import { connectdb } from "./src/lib/db.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", postRoute);

app.listen(PORT, () => {
  console.log(`This server is litening at localhost:${PORT}`);
  connectdb();
});
