import { DataSource } from "typeorm";
import { Pet } from "../Model/Pet";
import { User } from "../Model/User";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Pet, User],
  synchronize: true,
  logging: false,
});
