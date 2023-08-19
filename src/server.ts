import express from 'express';
import pino from 'pino-http';

const logger = pino();

const server = express();

server.use(express.json());
server.use(logger)

export default server;