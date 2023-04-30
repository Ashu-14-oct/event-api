const express = require('express');
const PORT = 3000;
const db = require('./config/mongoose');

const app = express();

//middlewares
app.use(express.urlencoded({extended: true}));


//router
app.use('/', require('./router/index'));

//listen
app.listen(PORT, (err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`server runnning on port ${PORT}`);
    }
});