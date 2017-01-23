var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
   Page.findAll()
  .then(function(foundPage){
    res.json(foundPage);
    // res.render('index', {pages: foundPage});
  });
});

router.post('/', function(req, res, next){


  var page = Page.findOrCreate({
  title: req.body.title,
  content: req.body.content,
  status: req.body.status

  });

  var user = User.findOrCreate({
    name: req.body.name,
    email: req.body.email

  });

  console.log('req.body is: ', req.body);
  page.save()
    .then(user.save())
      .then(function(savedPage){
        res.redirect(savedPage.route);
      }).catch(next);

});

router.get('/add', function(req, res, next){
  res.render('addpage');
});

router.get('/:page', function(req, res, next){
  // res.send('hit dynamic route at ' + req.params.page);
  console.log('page is ', req.params.page);
  Page.findAll({
      where: {
        urlTitle: req.params.page
      }
  })
  .then(function(foundPage){
    // res.json(foundPage);
    res.render('wikipage', {content: foundPage[0]});
  })
  .catch(next);
});


