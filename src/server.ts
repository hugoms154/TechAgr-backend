import express from 'express';
import cors from 'cors';
import './database';

import routes from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3333, () => console.log('running'));
