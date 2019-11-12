const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
let session = require('express-session');
const port = process.env.PORT || 3000;

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    key: 'userID',
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let routes = require('./routes/routes');
app.use(routes);

app.get('/', function (req, res) {
    res.render('home', {
        pageTitle: 'Home',
    });
});

app.listen(port, function () {
    console.log("Started on port 3000");
});