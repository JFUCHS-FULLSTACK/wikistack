var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
  res.render('index');
});

router.post('/', function(req, res, next){


  var page = Page.build({
  title: req.body.title,
  content: req.body.content,
  status: req.body.status

  });

  console.log('req.body is: ', req.body);
  page.save()
      .then(res.json(page));

});

router.get('/add', function(req, res, next){
  res.render('addpage');
});


