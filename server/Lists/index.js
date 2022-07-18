require('express-async-errors');
require('dotenv').config();
const express = require('express')
const app = express();
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const itemRouter = require("./routes/item");
const listRouter = require("./routes/list");
const PORT = process.env.PORT || 3002;

app.use(cors())

const {createItem,deleteItem} = require("./controllers/ItemIO");

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", (socket) => {
    console.log(`User with id: ${socket.id} connected`);
    socket.on("joinList", (data) => {
        socket.join(data);
        console.log(`User with id ${socket.id} joined the room: ${data}`)
    })
    socket.on("leaveList", (data) => {
        socket.leave(data);
        console.log(`User with id ${socket.id} left the room: ${data}`)
    })

    socket.on("createItem", async (data) => {
        const result = await createItem(data);
        io.in(data.listId).emit("newItem",result.item,result.userName);
    })
    socket.on("deleteItem", async (data) => {
        const item = await deleteItem(data);
        //io.in(data.listId).emit("deletedItem",item);
    })

    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected`);
    })
})


app.use("/api/v1/items",itemRouter);
app.use("/api/v1/lists",listRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        server.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    }catch(err){
        console.log(err)
    }
}
start();


