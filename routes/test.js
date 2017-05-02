/**
 * Created by jimin on 17/5/2.
 */
var express = require('express');
var router = express.Router();
var BCMessage = require('../model/message').BCMessageObj;

router.get('/msg', function(req, res, next){
    var msg = new BCMessage();
    console.log(JSON.stringify(msg));
    res.json(msg);
});

module.exports = router;