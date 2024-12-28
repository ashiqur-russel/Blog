import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

const allowedOrigins = ['http://localhost:3000', 'https://blog-psi-two-74.vercel.app'];


//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins, // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies
  })
);


// application routes
app.use('/api', router);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running!',
    api_start_point: '/api',
  });
});

export default app;
