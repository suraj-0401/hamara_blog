import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'; 
import cookieParser from 'cookie-parser'; 
import userRoute from './routes/route.user.js'; 
import blogRoute from './routes/route.blog.js'; 
import commentRoute from './routes/route.comment.js';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
dotenv.config(); 
const app = express();
const server = http.createServer(app); 
const io = new Server(server, { cors: { origin: '*' } });


app.use(cors({
  origin: '*', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(cookieParser()); 
app.use(express.json()); 

const port = process.env.PORT; 
const MONGO_URL = process.env.MONGO_URL; 

if (!MONGO_URL) {
  console.error('MONGO_URL environment variable is not set');
  process.exit(1);
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/temp/",
}));

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

mongoose.connect(MONGO_URL) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



app.use('/api/users', userRoute); 
app.use('/api/blogs', blogRoute); 
app.use('/api/comment', commentRoute);
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



server.listen(port, () => { 
  console.log(`Server running on port ${port}`);
}).on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});


