const express = require('express');
const morgan = require('morgan'); //middleware

const path = require('path')

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
//app.use(require('./routes'));
app.use('/baterias', require('./routes/baterias'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
