const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
//name of collection
const Contact = mongoose.model('Contact',contactSchema); //name of database should start with capital letter also after const
module.exports = Contact;