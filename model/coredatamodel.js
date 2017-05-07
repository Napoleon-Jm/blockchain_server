/**
 * Created by jimin on 17/5/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoreDataModel = new Schema({
    patientId: String,
    hostpitalId: String,
    reason: String,
    content: String,
    date: String,
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('coredata',CoreDataModel);