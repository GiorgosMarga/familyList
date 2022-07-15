require('dotenv').config();
require('express-async-errors');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5050;
const cors = require("cors");

//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
//error handler
const notFoundMiddleware = require("./middlewares/notfound");
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(cors());

//middlewares
app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    }catch(err){
        console.log(err)
    }
}
start();



