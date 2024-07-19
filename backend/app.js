import express from "express";
import { userRouter } from "./routers/User.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ 
  extended: true,
  limit: "50mb" 
}));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.WEB_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Server is working");
});