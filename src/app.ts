import express from 'express';
import morgan from 'morgan';
import router from './routes/index';

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use('/', router);


export default server;