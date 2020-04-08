var express = require('express');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser('nvlinh99'));

app.use(express.static('public'));
app.use('/users',authMiddleware.requiredAuth, userRoute);
app.use('/auth', authRoute);


// Routes
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Nguyen Khanh Anh'
  });
});

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
