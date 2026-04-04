import express from 'express';
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import cors from 'cors';
import cropRoutes from "./routes/Crop.js";
import cropRouter from './routes/Crop.js';
import connectDB from './config/db.js';


dotenv.config();

const app = express();

app.use(cors({
    origin: "https://bhumi-omega.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended : true} ))



connectDB();

app.use('/api/', UserRoute)

app.use("/api", cropRouter);

app.listen(5000, ()=>
console.log("server start")
);