const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config({path: './config.env'});
require('./db/conn');

const PORT = process.env.PORT || 8080;
const User = require('./model/userSchema');
const Chat = require("./model/postSchema");
app.use(express.json());
app.use(require('./router/auth'));



if(process.env.NODE_ENV == 'production'){
    app.use(express.static('tattle/build'));
}

app.listen(PORT, ()=>{
});