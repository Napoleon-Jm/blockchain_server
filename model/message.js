/**
 * Created by jimin on 17/5/2.
 */
var config = require('../config');
var BCMessageObj = function(){
    return {
        "jsonrpc": "2.0",
        "method": "调用方法",
        "params": {
            "type": 1,
            "chaincodeID": {
                "name": config.contractName
            },
            "ctorMsg": {
                "function":"函数名",
                "args":[ "参数1", "参数2","参数3","参数4"]
            }
        },
        "id": 0

    }
};

function BCMessage(jsonrpc, method, params, id) {
    this.jsonrpc = jsonrpc;
    this.method = method;
    this.params = params;
    this.id = id;
    if ('undefined' == typeof BCMessage._initialized) {
        BCMessage.prototype.setJsonrpc = function (j) {
            this.jsonrpc = j;
        }
        BCMessage.prototype.setChaincodeIdName = function (id) {
            this.params.chaincodeID.name = id;
        }
        BCMessage.prototype.setMethod = function (me) {
            this.method = me;
        }
        BCMessage.prototype.setId = function (id) {
            this.id = id;
        }
        BCMessage.prototype.setParams = function (pa) {
            this.params = pa;
        }
    }
    BCMessage._initialized = true;
}

function CtorMsg(func, args){
    this.func = func;
    this.args = args;
}

function ChaincodeId(name) {
    this.name = name;
}

/*
"params": {
 "type": 1,
 "chaincodeID": {
 "name": config.contractName
    },
 "ctorMsg": {
 "function":"函数名",
 "args":[ "参数1", "参数2","参数3","参数4"]
    }
 }
*/

function Params(type, chaincodeId, ctorMsg) {
    this.type = type;
    this.chaincodeID = chaincodeId;
    this.ctorMsg = ctorMsg;
}

exports.BCMessage = BCMessage;
exports.CtorMsg = CtorMsg;
exports.ChaincodeId = ChaincodeId;
exports.Params = Params;
exports.BCMessageObj = BCMessageObj;