import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

//import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
//app.use('/api/v1', router);


export default app;