require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');
var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser(process.env.session_secret));
app.use(csurf({ cookie: true }));

app.use(sessionMiddleware);
app.use(express.static('public'));
app.use('/users',authMiddleware.requiredAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requiredAuth, transferRoute);
app.use('/api/products',apiProductRoute);

// Routes
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Nguyen Khanh Anh'
  });
});

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
