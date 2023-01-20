import express from "express";
import "reflect-metadata";
import database from "./config/database";
import app from "./app";
const PORT = 3001;

database
  .initialize()
  .then(() => {
    console.log("DB connect");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
