import express from "express";
import petsRouter from "./pets.router";
import morgan from "morgan";

const app = express();

//Middlewares
// app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/pets", petsRouter);

export default app;
