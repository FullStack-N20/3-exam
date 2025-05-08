import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.log(`Error on connecting to database: ${error}`);
  }
};
