// dependencies
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//imports
import userRoutes from './Routes/userRoutes.js';
import todoRouter from './Routes/todoRoutes.js';
// config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// connecting db
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// listener
app.use('/api/users', userRoutes);
app.use('/api/todo', todoRouter);
app.listen(PORT, () => {
  console.log('server is running on port 5000');
  connectDb();
});
