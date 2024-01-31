import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';
import { initMongoDB } from './config/db';
import router from './router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9091;

// init DB
initMongoDB();

// Middlewares
app.use(
    cors({
        credentials: true,
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// App use Router
app.use('/api', router());

const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
