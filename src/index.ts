import "reflect-metadata";
import database from "./config/database";
import server from './app';
const PORT = 3001;

database
  .initialize()
  .then(() => {
    console.log("DB connect");
  })
  .catch(console.error);

server.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
