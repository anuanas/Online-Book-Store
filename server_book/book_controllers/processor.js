var Books=require('../model/books').Books;
var Clients=require('../model/books').Clients;
var Ids=require('../model/books').Ids;
var randomstring = require("randomstring");

exports.add_book=function(req,res){
	var book = new Books({
	title : req.query.title,
    author : req.query.author ,
    edition : req.query.edition ,
	genre : req.query.genre ,
	price: req.query.price,
	stock: req.query.stock,
	ISBN: randomstring.generate({ length: 6}),
	image:'http://ecx.images-amazon.com/images/I/61EIk%2BG8ymL._SX321_BO1,204,203,200_.jpg'
	});
		
	book.save(function(err) {
	if (err) return console.log(err);
	res.send(book);
	});
}



exports.get_books=function(req,res){
 Books.find({}, function(err,book){
 if(err){
  console.log(err);
 }
 res.send(book);
 });
};





exports.listBooks=function(req,res){
console.log("aaaaaaa...");
console.log("Req.body>>>>>>>",req.body);
Clients.findOne({ reg_id:req.query.RegistrationId }, function(err, user) {
	console.log('RegI>>>>>>>>>>',req.query.RegistrationId);
  if (err) {
  	
  	console.log(err);
  			}
  else if(user==undefined)
   	{

  res.send("Authorisation failed...!!!");
	}
	else
	{
			console.log("I am here");	
		Books.find({}, function(err,book){ 
			console.log(book);
			res.send(book);
		});

	}
});
}

exports.registration=function(req,res){

var regId=randomstring.generate({length: 6});

 var client=new Clients({
  reg_id:regId,
  name:req.body.name,
  email:req.body.email,
  mobile_num:req.body.mobile_num,
  status:'ACTIVE'
 });

 client.save(function(err){
  if (err)
  { 
  	if (err.hasOwnProperty('errors'))
  	{
	  	if(err.errors.email !=undefined && err.errors.mobile_num !=undefined)
	  	{
	  		//res.send(err.errors.email.message+" and "+err.errors.mobile_num.message);
	  		res.send("Mobile number and email Id already exists");
	  		console.log("workiiiii");
	  	} 
	  	else if(err.errors.mobile_num !=undefined && err.errors.email ==undefined )
	  	{
	  		res.send(err.errors.mobile_num.message);
	  	}

	  	else if(err.errors.mobile_num ==undefined && err.errors.email !=undefined) 
	  	{
	  		res.send(err.errors.email.message);
	  	}
  	}
  	
  	return console.log(err);
  		
  }

  res.send(
  	{RegistrationID: client.reg_id , 
  		Name: client.name, 
  		MobileNumber:client.mobile_num,
  		Email: client.email, 
  		Status:client.status });
  
 });
};



exports.sellBooks = function(req,res){


var pid= req.body.ISBN;
var qty = req.body.qty;

Books.findOne({ISBN:pid}, function(err, user) {
  if (err) 
  {
  	console.log(err);

  }
 
  else
  {		

		if (user.stock==0 || user.stock<qty)
			{
				var token = randomstring.generate({ length: 4});
  				var book_id = "BOOK_"+token	;
				save_id(book_id,"Failed",pid);
				res.send("Sorry..!! The requested book is out of stock.");


			}

		else{
	
  			var token = randomstring.generate({ length: 4});
  			var book_id = "BOOK_"+token	;
  				console.log(book_id);
  				save_id(book_id,"Success",pid);

  			user.stock=user.stock - qty;

  			user.save(function(err,data) 
  			{
    		res.send({book_id:book_id,stock:user.stock});
    		console.log(data);
    		});

    
  }
  }
});

}

function save_id(book_id,status,pid){

	var book = new Ids({
	book_id : book_id,
	ISBN: pid,
	status: status
	});
		
	book.save(function(err) {
	if (err) return console.log(err);
	console.log(book);
	});

}

































