const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));



app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require('./routers'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server Running On Port : ${port}`);
});