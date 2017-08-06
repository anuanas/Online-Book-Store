var express = require('express');
var router = express.Router();
var processor=require('../controller/processor');

/* Show full book details*/
router.get('/', processor.books);

//Registring with service Provider
router.get('/register',processor.register);
router.get('/listBooks',processor.listBooks);
router.get('/buyBooks',processor.buyBooks);
router.get('/getBooks', processor.books);

module.exports = router;
