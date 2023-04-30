const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/EventAPI');

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully connected to the database');
    }
});
module.exports = db;