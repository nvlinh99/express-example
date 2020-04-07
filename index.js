var express = require('express');
var userRoute = require('./routes/user.route');
var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 


app.use(express.static('public'));
app.use('/users', userRoute);

// Routes
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Nguyen Khanh Anh'
  });
});

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
