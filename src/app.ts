import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const server = express();

//options for cors midddleware
server.use(cors());

server.use(morgan("dev"));
server.use(express.json());
// server.use(cors(options));

//enable pre-flight
// router.options("cors", cors(options));




// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.ACCES_TOKEN
});





server.use("/", router);

export default server;
