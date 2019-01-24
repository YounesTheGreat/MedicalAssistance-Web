var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let patients = [1,2,3,4,5,6,7,8];
  let rendezVous = [1,2,3,4,5]
  res.render('index', { title: 'Bienvenue !', patients, rendezVous });
});



module.exports = router;
