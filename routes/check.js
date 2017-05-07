/**
 * Created by jimin on 17/5/2.
 */
var express = require('express');
var router = express.Router();
var LocalModel = require('../model/localapplicationmodel');
var CoreData = require('../model/coredatamodel');
var assert = require('assert');

/**
 * 增加申请单。
 */

router.post('/third/app', function (req, res, next) {
   var app = new LocalModel({
       applicantId: String,
       patientId: String,
       patientAgree: String,
       hostpitalId: String,
       hostpitalAgree: String,
       reason: String,
   });
   app.save(function (err) {
       assert.equal(err, null);
       console.log("coredata 1 saved");
       res.json()
   })
});

/**
 * 轮询
 * patientId
 */
router.post('/patient/query', function(req, res, next) {
    LocalModel.find({"patientId": req.body.patientId, "hospitalIAgree": "1"}, function (err, docs) {
        res.json(docs);
    });
});

/**
 * 轮询
 * hospitalId
 */
router.post('/hospital/query', function (req, res, next) {
    LocalModel.find({"hospitalId": req.body.hospitalId}, function (err, docs) {
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
 */
router.post('/third/query/check', function (req, res, next) {
    LocalModel.findOne({"applicationID": req.body.applicationID, "patientAgree": "1", "hospitalAgree": "1"}, function (err, doc) {
        // res.json(docs);
        CoreData.findOne({"patientId": doc.patientId}, function (err, doc) {
            res.json(doc);
        })
    })
});

/**
 * id 是申请单号， patientId 是当前病人编号，agree 是 verify 的同意状态。
 * id, patientId, agree
 */
router.post('/patient/verify', function(req, res, next) {
    LocalModel.findOne({"patientId": req.body.patientId, "_id": req.body.id}, function(err, doc){
        // 更新doc的agree状态。
    })
});

router.post('/hostipal/verify', function (req, res, next) {
    LocalModel.findOne({"hospitalId": req.body.hospitalId, "_id": req.body.id}, function(err, doc){
        // 更新doc的agree状态。
    })
});

module.exports = router;
