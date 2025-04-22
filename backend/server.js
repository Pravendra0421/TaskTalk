import http from 'http';
import app from './app.js';
import 'dotenv/config'
const server = http.createServer(app);
const PORT=process.env.PORT ||6000;
server.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})