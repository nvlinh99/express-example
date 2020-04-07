var db = require("../db");
module.exports.requiredAuth = function(req, res, next) {
    if(!req.cookies.token){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.cookies.token}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
};