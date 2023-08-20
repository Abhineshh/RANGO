const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');
const PORT = 5000;

const app = express();




const ding = {
  origin: ' exp://192.168.41.176:8081',
  optionsSuccessStatus:200,
}


app.post('/user',cors(ding),function(req,res){
  res.send('the request wass successfull');
  console.log(req[Email])
  })

const server = app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
    });




