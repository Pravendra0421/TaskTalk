import mongoose from "mongoose";
import 'dotenv/config'
const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to mongodb");
    })
    .catch((err)=>{
        console.log(err);
    })
}
export default connectDb;