import express from 'express';
import path from 'path';

const server = express();

server.use(express.json());
server.use('/assets', express.static(path.join(__dirname, '../assets')))


export default server;
