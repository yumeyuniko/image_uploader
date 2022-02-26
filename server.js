const express = require('express')
const app = express();

const hbs = require('express-handlebars');
const path = require('path');


app.use(express.json());

//server static files
app.use(express.static(path.join(__dirname, 'public')));

//connect mongodb database
require('./server/database/database')();

//setup views engine
app.set('view engine', 'hbs');
app.engine('.hbs',
  hbs.engine({
    extname: 'hbs',
    defaultView : 'default',
    layoutsDir : path.join(__dirname , 'views'),
    partialsDir : path.join(__dirname, 'views/partials')
  }));

//calling routes
app.use('/', require('./server/router/router'));

app.listen(3003, () => console.log(`Server is stated on http://localhost:3003`));