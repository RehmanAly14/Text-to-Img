import "dotenv/config";
import express from "express";
const app = express();
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from "./routes/userRoute.js";
import imgRouter from "./routes/imgRoutes.js";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


app.use('/api/user',userRouter);
app.use('/api/image',imgRouter)


const port = process.env.PORT || 2020;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});