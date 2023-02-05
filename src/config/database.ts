import { DataSource } from "typeorm";
import { Pet } from "../Model/Pet";
import { User } from "../Model/User";
import { Product } from "../Model/Product";
import { Veterinary } from "../Model/Veterinary";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Pet, User, Product, Veterinary],
  synchronize: true,
  logging: false,
});

// export default new DataSource({
// 	name: "default",
// 	type: "postgres",
// 	url: process.env.DB_DEPLOY,
// 	entities: [Pet, User, Product, Veterinary],
// 	synchronize: true,
// 	logging: false,
// });
