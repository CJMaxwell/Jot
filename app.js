import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);

app.get('/', (req, res) => res.status(200).send(`<h3>Welcome to PREN Todo App!</h3>`));



app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});