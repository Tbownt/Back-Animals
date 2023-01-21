import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";

const server = express();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3000",
  preflightContinue: false,
};

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(options));

//enable pre-flight
router.options("cors", cors(options));

server.use("/", router);

export default server;
