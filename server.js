const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to log');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenace.hbs');
})
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(str)=>{
    return str.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('index.hbs',{pageTitle:'Home Page',copyyear:new Date().getFullYear()});
});

app.get('/about',(req,res)=>{
        res.render('about.hbs',{pageTitle:'About Page',copyyear:new Date().getFullYear()});
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to handle request'
    });
});


app.listen(8080,()=>{
    console.log('Starting server at 8080');
});