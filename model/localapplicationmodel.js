/**
 * Created by jimin on 17/5/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Agree: 1 代表同意，
 * 2 代表不同意，
 * 3 代表等待中。
 *
 * 病人ID规约用1开头
 * 医院ID规约用2开头
 */

var LocalApplicationModel = new Schema({
    applicantId: String,
    patientId: String,
    patientAgree: String,
    hostpitalId: String,
    hostpitalAgree: String,
    reason: String,
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('application',LocalApplicationModel);