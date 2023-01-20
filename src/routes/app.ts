// import { Router } from "express";
import express from "express";
import morgan from "morgan";
// import cors from "cors";
import petsRouter from "./pets.router";

const app = express();

//Middlewares
// app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

app.use("/pets", petsRouter);

export default app;
//modificado
