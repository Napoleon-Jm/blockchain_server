/**
 * Created by jimin on 17/5/2.
 */
var express = require('express');
var router = express.Router();
var LocalModel = require('../model/localapplicationmodel');
var CoreData = require('../model/coredatamodel');

/**
 * patientId
 */
router.post('/patient/query', function(req, res, next) {
    LocalModel.find({"patientId": req.body.patientId, "hospitalId": "1"}, function (err, docs) {
        res.json(docs);
    });
});

/**
 * hospitalId
 */
router.post('/hospital/query', function (req, res, next) {
    LocalModel.find({"hospitalId": req.body.hospitalId}, function (err, docs) {
        res.json(docs);
    })
});

/**
 * applicationId
 */
router.post('/third/query', function (req, res, next) {
    LocalModel.find({"applicationID": req.body.applicationID}, function (err, docs) {
        res.json(docs);
    })
});

router.post('/third/query/check', function (req, res, next) {
    LocalModel.findOne({"applicationID": req.body.applicationID, "patientId": "1", "hospital": "1"}, function (err, doc) {
        // res.json(docs);
        CoreData.findOne({"patientId": doc.patientId}, function (err, doc) {
            res.json(doc);
        })
    })
});


router.post('/patient/verify', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/hostipal/verify', function (req, res, next) {

});


module.exports = router;
