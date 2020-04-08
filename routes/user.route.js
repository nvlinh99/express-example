var express = require('express');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authMiddleware.requiredAuth, controller.index);

router.get('/cookie', function(req, res, next) {
    res.cookie('token', 12345);
    res.send('Cookie saved !');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;
