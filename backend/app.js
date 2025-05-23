import express from "express"
import morgan from "morgan";
import connectDb from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import projectRouter from "./routes/project.routes.js";
import cors from "cors"
import aiRouter from "./routes/ai.routes.js"
connectDb();
const app=express();
app.use(cors({
  origin: 'https://tasktalk-frontend.onrender.com',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/users',userRouter)
app.use('/project',projectRouter);
app.use('/ai',aiRouter);
app.get('/',(req,res)=>{
    res.send("Hello world!");
})
export default app;
