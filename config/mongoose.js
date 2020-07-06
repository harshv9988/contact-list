//require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://mongoUser:mongoUser@cluster0.qyh17.mongodb.net/<dbname>?retryWrites=true&w=majority');

//acquire and check connection

const db = mongoose.connection;

//error

db.on('error',console.error.bind('error connecting to db'));

//success
db.once('open',function(){
    console.log('successfully connected to the database');
});