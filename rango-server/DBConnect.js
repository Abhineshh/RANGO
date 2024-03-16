const mongoose = require('mongoose');

module.exports.DBConnect = async (DB_URL)=>{
    try{
        const dbOptions ={
            dbName:'Rango',
        }
    await mongoose.connect(DB_URL,dbOptions);
    console.log("the database wddas connected");
    }catch(err){
        console.log(err);
    }

}

