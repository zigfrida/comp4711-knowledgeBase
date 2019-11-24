const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
let session = require('express-session');
let dateFormat = require('dateformat');

const port = process.env.PORT || 3000;

const expressHbs = require('express-handlebars');
const hbs = require('handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs',
    })
);

hbs.registerHelper("ifPost", function(ID1, ID2, options) {
    if (ID1 == ID2) return options.fn(this);
    return options.inverse(this);
});

hbs.registerHelper("date", function (date) {
    return new hbs.SafeString(dateFormat(date, "dd mmm yyyy"));
});

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