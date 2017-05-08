/**
 * Created by wangjimin on 17/5/8.
 */
var Poster = require("../model/sender");
var contract = require("../contract");
var BCMessageAdd = require('../model/message').BCMessageAdd;
/**
 * 向区块链中加入病历信息。
 *
 * post body: {
 *      "id":
 *      "position":
 *      "hash":
 *      "category":
 *  }
 */
function addCoreData(data, callback) {
    var body = data;
    var msg = new BCMessageAdd([body.id, body.position, body.hash, body.category]);
    // console.log(contract.storeName);
    msg.params.chaincodeID.name = contract.storeName;
    console.log(JSON.stringify(msg));
    poster = new Poster(msg, function(err, resdata){
        if(err != null){
            console.log('err');
            callback(err, null);
        }
        callback(null, resdata);
    })
}

function queryCoreData(data, callback){
    var body = data;
    var msg = new BCMessageQuery([body.id]);
    msg.params.chaincodeID.name = contract.storeName;
    console.log(JSON.stringify(msg));
    poster = new Poster(msg, function(err, resdata){
        if(err != null){
            console.log('err');
            callback(err, null);
        }
        callback(null, resdata);
    })
}

function addApplicationLog(data, callback){
    var body = data;
    var msg = new BCMessageAdd([body.logId,
        body.applicationId,
        body.hospitalId,
        body.hospitalAgree,
        body.patientId,
        body.patientAgree]);
    msg.params.chaincodeID.name = contract.lookUpName;
    console.log(msg);
    poster = new Poster(msg, function (err, resdata) {
        if(err != null){
            console.log('err');
            callback(err, null);
        }
        callback(null, resdata);
    })
}

module.exports = {
    addCoreData: addCoreData,
    queryCoreData: queryCoreData,
    addApplicationLog: addApplicationLog
};
