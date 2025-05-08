import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import userRouter from './routes/user.routes.js';
import categoryRouter from './routes/category.route.js';
import courseRouter from './routes/course.route.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger/logger.js';
import enrollmentRouter from './routes/enrollment.routes.js';

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/course', courseRouter);
app.use('/enrollment', enrollmentRouter);

app.listen(PORT, logger.info(`Server running on port ${PORT}`));
