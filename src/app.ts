import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running!',
    api_start_point: '/api',
  });
});

export default app;
