Project name: Client
author: Mahin anas
date:Dec-19-2016

url:192.168.3.166
port:2000

Routes:
/books: To display all books(get method).
/register: To register with service provider (post method).
/listBooks:To display all books by passing Registration Id (post method).
/buyBooks:To buy books (post method).

Controller:
Processor.js:-
		books:Function to display all books.
		register:Function to register with service provider.
		listBooks:Function to display all books by passing Registration Id.
		buyBooks:Function to buy books.

utility.js:-
		log:To log the request and response.

Public:
css file- style_custom.css
js file- script.js

View:
index.ejs- Rendering file.
