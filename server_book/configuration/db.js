var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book_schema');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Server Db connected....");
});

