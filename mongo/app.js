var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 8080;
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
    console.log("getting all books");
    Book.find({})
      .exec(function(err, result) {
        if (err) {
          res.send('erro has occured');
        }else {
          console.log(result);
          res.json(result);
        }
      });
});

app.get('/books/:id', function(req, res) {
    Book.findOne({
      _id: req.params.id
    })
      .exec(function(err, book) {
        if (err) {
          res.send('erro has occured');
        }else {
          console.log(book);
          res.json(book);
        }
      });
});

app.post('/book', function(req, res) {
  var newbook = new Book();

  newbook.title = req.body.title;
  newbook.author = req.body.author;
  newbook.category = req.body.category;

  newbook.save(function(err, result) {
      if (err) {
        res.send('erro has occured');
      }else {
        console.log(result);
        res.json(result);
      }
    });

});


app.post('/book2', function(req, res) {
    Book.create(req.body, function(err, book) {
        if (err) {
          res.send(err);
        }else {
          console.log(book);
          res.send(book);
        }
    });
});

app.listen(port, function() {
  console.log('app started on', + port);
});
