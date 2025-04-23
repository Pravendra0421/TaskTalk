import http from 'http';
import app from './app.js';
import 'dotenv/config'
import jwt from "jsonwebtoken"
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';
const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*'
    }
})
const PORT=process.env.PORT ||6000;

io.use(async(socket,next)=>{
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid projectId'))
        }
        socket.project = await projectModel.findById(projectId);
        if(!token){
            return next( new Error ('Authenticated error'))
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return next( new Error ('Authenticated error'))
        }
        socket.user=decoded;
        next();
    } catch (error) {
        next(error)
    }
})
io.on("connection",(socket)=>{
    socket.roomId=socket.project._id.toString()
    console.log("A user connected :",socket.id)
    console.log(socket.roomId)
    socket.join(socket.roomId);
    socket.on('project-message',data=>{
        console.log(data);
        socket.broadcast.to(socket.roomId).emit('project-message',data)
    })
    socket.on("disconnect",()=>{
        console.log("user diconnected");
        socket.leave(socket.roomId)
    })
})
server.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})