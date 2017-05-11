/**
 * Created by jimin on 17/5/2.
 */
var express = require('express');
var router = express.Router();
var LocalModel = require('../model/localapplicationmodel');
var CoreData = require('../model/coredatamodel');
var assert = require('assert');
var BC = require('../blockchain/bcoperation');

/**
 * 查询病历
 * reason
 */

router.post('/third/query/data', function (req, res, next) {
    CoreData.find({'reason': req.body.reason}, function (err, docs) {
        res.json(docs);
    })
});

/**
 * 增加申请单。
 */

router.post('/third/app', function (req, res, next) {
    var body = req.body;
    var app = new LocalModel({
        coreDataId: body.coreDataId,
        applicationId: body.applicationId,
        patientId: body.patientId,
        patientAgree: '3',
        hospitalId: body.hospitalId,
        hospitalAgree: '3',
        reason: body.reason
    });
    app.save(function (err, result) {
       assert.equal(err, null);
       console.log("local data 1 saved");
       console.log(result);
        BC.addApplicationLog({
            "logId": result._id,
            "applicationId": result.applicationId,
            "hospitalId": result.hospitalId,
            "hospitalAgree": result.hospitalAgree,
            "patientId": result.patientId,
            "patientAgree": result.patientAgree
        }, function (err, r) {
            if(err == null){
                console.log("Add application log to block chain success!");
            }
        });
       res.json(result);
    });
});

/**
 * 轮询
 * patientId
 */
router.post('/patient/query', function(req, res, next) {
    LocalModel.find({"patientId": req.body.patientId, "hospitalAgree": "1"}, function (err, docs) {
        res.json(docs);
    });
});

/**
 * 轮询
 * hospitalId
 */
router.post('/hospital/query', function (req, res, next) {
    LocalModel.find({"hospitalId": req.body.hospitalId, "hospitalAgree": "3"}, function (err, docs) {
        res.json(docs);
    })
});

/**
 * 轮询
 * applicationId
 */
router.post('/third/query', function (req, res, next) {
    LocalModel.find({"applicationID": req.body.applicationID}, function (err, docs) {
        res.json(docs);
    })
});

/**
 * 第三方查看文档。
 * _id
 */
router.post('/third/query/check', function (req, res, next) {
    LocalModel.findOne({"_id": req.body._id, "applicationID": req.body.applicationID, "patientAgree": "1", "hospitalAgree": "1"}, function (err, doc) {
        // res.json(docs);
        if(err != null){
            res.json(err);
        }
        if(doc != null){
            console.log("application info ------------------ ");
            console.log(JSON.stringify(doc));
            BC.verify({"patientId": doc.patientId, "patientAgree": doc.patientId, "hospitalId": doc.hospitalId, "hospitalAgree": doc.hospitalAgree}, function (err, result) {
                console.log(" verify on bc")
            });
            BC.queryCoreData({"id" : doc.coreDataId}, function (err, result) {
                console.log("query data position on bc");
            });
            CoreData.findOne({"_id": doc.coreDataId, "patientId": doc.patientId}, function (err, doc) {
                res.json(doc);
            });
        } else {
            res.json({result: "no data"});
        }
    });
});

/**
 * id 是申请单号， patientId 是当前病人编号，agree 是 verify 的同意状态。
 * id, patientId, agree
 */
router.post('/patient/verify', function(req, res, next) {
    LocalModel.findByIdAndUpdate(req.body._id, {$set:{patientAgree: req.body.agree}},function(err,doc){
        console.log(doc); //MDragon
        res.json(doc);
    });
});

router.post('/hospital/verify', function (req, res, next) {
    LocalModel.findByIdAndUpdate(req.body._id, {$set:{hospitalAgree: req.body.agree}},function(err,doc){
        console.log(doc); //MDragon
        res.json(doc);
    });
});

module.exports = router;
