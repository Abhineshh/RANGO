const express = require('express');

const app = express();
app.use(express.json());

app.get(('/riderauth/passengerlogin'),(req,res)=>{
    res.json({
        name:'bill',
        age:99,
    })
})

app.get('/riderauth/passengerlogin',(req,res)=>{
  res.send('hello there');
})


app.listen('5000',()=>{console.log("connnedted")})