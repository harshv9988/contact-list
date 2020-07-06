const express = require('express'); //test
const path = require('path');   // for __dirname
const { nextTick } = require('process'); //automatic
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');  //for database
const Contact = require('./models/contact'); //for database
const app = express();

app.set('view engine','ejs');  //for ejs
app.set('views',path.join(__dirname,'views')); //for ejs
app.use(express.urlencoded());  //middleware for reading form data
app.use(express.static('assets'));  //accessing styling files

//middleware1
// app.use(function(req,res,next){          // this is just for showing usage of middleware no linked to contact list
//     console.log("mw1 called");
//     next();
// });

//middleware2
// app.use(function(req,res,next){          // this is just for showing usage of middleware no linked to contact list
//     console.log("mw2 called");
//     next();
// });

var contactList = [      // used when no databse was present
    {
        name: "Harsh",
        phone: "890"
    },

    {
        name: "nikhil",
        phone: "123"
    }
]

app.get('/',function(req,res){
    // res.send('<h1> It is running</h1>'); this statement is for only express when template engine is not present

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list : contacts
    
        });
    })
});

app.get('/practice',function(req,res){
    return res.render('practice',{title:"practice Session"});
});

app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating contact');
           return;
        }

        console.log('*********',newContact);
        return res.redirect('back'); 

    });
    
});

app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    })
    
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running');
    }
    console.log(' server is running');
});

