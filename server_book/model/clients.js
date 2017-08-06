var mongoose = require('mongoose');
var randomstring = require("randomstring");

var Schema = mongoose.Schema;

var client_schema = new mongoose.Schema({

	reg_id : {type: String},
	client_name : {type: String},
	client_status : {type: String},
	client_email : {type: String},
	client_mnum : Number

});

module.exports = mongoose.model('Clients',client_schema,'client_collection');