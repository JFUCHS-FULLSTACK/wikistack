var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/users', function(req, res, next){
   User.findAll()
  .then(function(foundUser){
    // res.json(foundPage);
    res.render('users', {users: foundUser});
  })
  .catch(next);
});

router.get('/users/:id', function(req, res, next){
  // res.send('hit dynamic route at ' + req.params.page);
  Page.findAll({
    include: [
        { model: User,
          as: 'author',
          required: true,
          where: {  id: req.params.id }
    }]
  })
  .then(function (user) {
    res.render('user', {users: user});
    // res.json(page);
  });
});


router.get('/', function(req, res, next){
   Page.findAll()
  .then(function(foundPage){
    // res.json(foundPage);
    res.render('index', {pages: foundPage});
  });
});

router.post('/', function(req, res, next){

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    // var page = Page.build({
    //   title: req.body.title,
    //   content: req.body.content,
    //   status: req.body.status
    // });

    var newPage = Page.build(req.body);

    return newPage.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);


});

router.get('/add', function(req, res, next){
  res.render('addpage');
});

// router.get('/:page', function(req, res, next){
//   // res.send('hit dynamic route at ' + req.params.page);
//   // console.log('page is ', req.params.page);
//   Page.findAll({
//       where: {
//         urlTitle: req.params.page
//       }
//   })
//   .then(function(foundPage){
//     // res.json(foundPage);
//     res.render('wikipage', {content: foundPage[0]});
//   })
//   .catch(next);
// });





router.get('/:page', function(req, res, next){
  // res.send('hit dynamic route at ' + req.params.page);
  Page.findAll({
    include: [
        { model: User,
          as: 'author',
          required: true
    }],
    where: {  urlTitle: req.params.page }
  })
  .then(function (foundPage) {
    // res.json(foundPage);
    if (foundPage[0] === undefined) {
        res.status(404).send();
    }
    else {
      res.render('wikipage', {content: foundPage[0]});
    }
    // res.json(page);
  })
  .catch(next);
});

//   console.log('page is ', req.params.page);
//   Page.findAll({
//       where: {
//         urlTitle: req.params.page
//       }
//   })
//   .then(function(foundPage){
//     // res.json(foundPage);
//     res.render('wikipage', {content: foundPage[0]});
//   })
//   .catch(next);
// });
