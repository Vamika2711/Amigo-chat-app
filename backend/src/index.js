import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


import {app , server} from "./lib/socket.js";

dotenv.config()
const PORT = process.env.PORT;
// 👇 Create __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

}));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

server.listen(PORT, ()=>{
    console.log("server in runnning on PORT: "+ PORT);
    connectDB()
});