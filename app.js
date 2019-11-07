const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.listen(port, function () {
    console.log("Started on port 3000");
});