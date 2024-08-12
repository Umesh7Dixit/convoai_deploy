// Shree Radha

import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import cors from 'cors';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());//enabling CORS



app.get('/', (req, res) =>{
    res.send('Welcome to Shree Radha Conversation AI');
});


app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
    connectDb();
});