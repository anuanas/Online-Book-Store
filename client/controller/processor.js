/**
@author:Anas
date:20/12/2016
desc:Functions done in client application
**/
var request=require('request');
var randomstring = require("randomstring");
var utility=require('./utility');

//Disply all the books
exports.books=function(req,res){
	var option1={
   uri:"http://192.168.0.28:4000/Books",
   method:"GET"
 	}
 console.log('hit Server...!');
  request(option1,function(error, response,body){
  	if(error){
  		console.log(error);
  	}else{
  		var token=randomstring.generate({length: 4});
  		//log the response
  		utility.log('search_response_'+token,body);
  		//process the response
  		var processedResponse= process(JSON.parse(body));
  		processedResponse.token=token;
  		utility.log('processedResponse'+token,JSON.stringify(processedResponse));
  		//render the template
		if(req.query.api=='true'){
			var a = [];
			
			for(var i in processedResponse['authors']){
				a.push(processedResponse['authors'][i]);
			}
			processedResponse.authors = a;
			res.json(processedResponse);
		}else{
			res.render('index',{data:processedResponse});
		}
  	}
	
  });


};
//Function for Markup
function process (books){
	var book_objects=[];
	//markup logic
	var markup=10;
	var authors={};
	var genre={};
	for(var i in books ){
		var book={	
		    title:books[i].title ,
		    author: books[i].author,
		    edition: books[i].edition,
		    genre: books[i].genre,
		    price: books[i].price,
		    stock: books[i].stock,
		    ISBN: books[i].ISBN,
		    markup:markup,
		    totalPrice:books[i].price+markup,
		    image:books[i].image
			}
			//preparing author filter
			if(authors[books[i].author]){
				authors[books[i].author].count=authors[books[i].author].count+1;
			}else{
				authors[books[i].author]={name:books[i].author,count:1}
			}
			//prepare genre filter
			if(genre[books[i].genre]){
				genre[books[i].genre].count=genre[books[i].genre].count+1;
			}else{
				genre[books[i].genre]={name:books[i].genre,count:1}
			}
	   		 book_objects.push(book);	
			
		}

	
	return {books:book_objects,authors:authors,genre:genre};
}

exports.register=function(req,res){
 var option2 = {
 uri:"http://192.168.0.28:4000/register" ,
 method: "POST",
 json:{name:"Mahin Anas",email:"saif1@flyin.com",mobile_num:9995123454}
}
request(option2,function(error,response,body){     
  if(error){
   console.log(error);
  }
  else{
  	//console.log('CLIENT>>>>>>>>'+JSON.stringify(body));
   res.send(JSON.stringify(body));
  }
 });
}

exports.listBooks=function(req,res){
	var option3 = {
		uri:"http://192.168.0.28:4000/listBooks" ,
		method: "POST",
		json:{RegistrationId:req.query.RegistrationId}
	}

request(option3,function(error,response,body){     
  if(error){
   console.log(error);
  }
  else{
  	console.log(body);
   res.send(JSON.stringify(body));
  }
});

};
exports.buyBooks=function(req,res){
	var option={
		uri:"http://192.168.0.28:4000/sellBooks" ,
		method: "POST",
		json:{ISBN:req.query.isbn,qty:1}
	}
	var token = randomstring.generate({ length: 4,});
	utility.log('buy_request-'+token,JSON.stringify(option.json));
	request(option,function(error,response,body){
		if(error){
			console.log(error);
		}
		else{
			res.send(JSON.stringify(body));
			
			console.log("Response:",JSON.stringify(body));
			utility.log('buy_response-'+token,JSON.stringify(body));
		}

	});
};
