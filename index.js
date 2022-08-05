const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

// used for cookies session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routers'));



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server Running On Port : ${port}`);
});

