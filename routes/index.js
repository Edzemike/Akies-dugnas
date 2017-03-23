var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var multer = require('multer');
var upload = multer({dest: 'public/uploads/'})

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('eyeExamination/index', { csrfToken: req.csrfToken() });
});

router.post('/', upload.any(), function(req, res, next) {
    res.send(req.files);
});

router.get('/user/signup', function(req, res, next){
    res.render('user/signup', {csrfToken: req.csrfToken()})
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next){
    res.render('user/profile');
});


module.exports = router;

