const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('http://localhost:127.0.0.1.27',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const server = app.listen(5000,()=>{
    console.log(`server started on port 5000`)
    });

const io = socket(server,{
    cors:{
        origin:"http://localhost:8081",
        credentials:true,
    },
});


