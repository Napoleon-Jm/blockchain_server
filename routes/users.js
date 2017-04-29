var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
            if (err) {
                res.set('Access-Control-Allow-Origin','*');
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                res.set('Access-Control-Allow-Origin','*');
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            // res.set('Access-Control-Allow-Origin','*');
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                // res.set('Access-Control-Allow-Origin','*');
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken(user);
            // res.set('Access-Control-Allow-Origin','*');
            res.status(200).json({
                username: user.username,
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

module.exports = router;