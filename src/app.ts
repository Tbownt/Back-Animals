import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";

const server = express();

//options for cors midddleware
server.use(cors());

server.use(morgan("dev"));
server.use(express.json());
// server.use(cors(options));

//enable pre-flight
// router.options("cors", cors(options));

server.use("/", router);

export default server;
