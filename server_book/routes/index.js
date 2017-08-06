var express = require('express');
var router = express.Router();
var processor=require('../book_controllers/processor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Server' });
});




router.get('/test',function(req,res,next){

res.send({Message:'It is working'});
});

router.get('/addBook', processor.add_book);
router.get('/Books',processor.get_books);
 




router.post('/register',processor.registration);
router.post('/listBooks',processor.listBooks);
router.post('/sellBooks',processor.sellBooks);



module.exports = router;