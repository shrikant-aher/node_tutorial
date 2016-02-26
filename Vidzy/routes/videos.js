var express = require('express');
var router = express.Router();


var monk = require('monk');
var db = monk('localhost:27017/vidzy');


router.get('/', function (req, res) {
  // body...
  var collection = db.get('videos');
  collection.find({}, function(error, videos) {
    // body...
    if (error) throw error;
    res.json(videos)
  })
})



module.exports = router
