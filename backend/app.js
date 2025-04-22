import express from "express"
import morgan from "morgan";
import connectDb from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import projectRouter from "./routes/project.routes.js";
import cors from "cors"
connectDb();
const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}
));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRouter)
app.use('/project',projectRouter);
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("Hello world!");
})
export default app;
