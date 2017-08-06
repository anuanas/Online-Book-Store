var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var randomstring = require("randomstring");


var Schema = mongoose.Schema;

var book_schema = new mongoose.Schema({ 
	title : {type: String },
    author : {type: String } ,
    edition : Number ,
	genre : {type: String } ,
	price: Number,
	stock: Number,
	ISBN: {type: String },
	image:{type: String}
});
 
//saving client data

var client_schema = new mongoose.Schema({

	reg_id : {type: String},
	name : {type: String},
	status : {type: String},
	email : {type: String, unique: true},
	mobile_num : {type: String, unique: true}

});

//saving booking ID

var id_schema = new mongoose.Schema({

book_id : {type : String},
ISBN: {type : String},
date: {type: Date, default: Date.now},
status: {type :String}

});






client_schema.plugin(uniqueValidator, { message: '{PATH} already exists' });


module.exports ={
	Books: mongoose.model('Books', book_schema, 'book_collection'),
	Clients:mongoose.model('Clients',client_schema,'client_collection'),
	Ids:mongoose.model('Ids',id_schema,'id_collection')
}

