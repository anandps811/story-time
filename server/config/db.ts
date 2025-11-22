import Mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();export const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.CONNECTION_STRING || '');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};