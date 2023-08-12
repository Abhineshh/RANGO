const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');


const app = express();

app.use(cors());
app.use(express.json());

app.post('/login',function(req,res){console.log(req)})

const server = app.listen(5000,()=>{
    console.log(`server started on port 5000`)
    });

const io = socket(server,{
    cors:{
        origin:"http://192.168.41.176:8081",
        credentials:true,
    },
});


