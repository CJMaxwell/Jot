import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes';
import todoRoutes from './Routes/todoRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);
app.use('/api/v1', todoRoutes);

app.get('/', (req, res) => res.status(200).send(`<h1 style="text-align: center; padding-top: 30vh">Welcome to PREN Todo App!</h1>`));



app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});