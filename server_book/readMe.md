(1)
Projetct_name: Book_store
authors: Mahin Anas
date:24/12/2016

(2)
Description: 
An online website to where one can find books belonging to different genres and buy online.

(3)
using Mongoose to set up the database as follows

Database name: book_schema

Following is the schema for the Book collection.

book_collection:

	title : {type: String },
    author : {type: String } ,
    edition : Number ,
	genre : {type: String } ,
	price: Number,
	stock: Boolean

	creating a model for the above schema
Model name: Books


Following is the schema for the Book collection.
client_collection:

	reg_id : {type: String},
	name : {type: String},
	status : {type: String},
	email : {type: String, unique: true},
	mobile_num : {type: String, unique: true}
	
creating a model for the above schema
Model name: Clients	



(4)
Controllers and routes:

router.get('/addBook', processor.add_book) :- Adding books to the database, as per the model. 

router.post('/register',processor.registration) :- Registration of client and saving the details into database, post evaluating duplicates.

router.post('/sellBooks',processor.sellBooks)  :- Providing a buy service for the client. Post purchase updating the stock details in database and sending a booking ID as a response to the client.


