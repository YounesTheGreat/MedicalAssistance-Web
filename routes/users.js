const express = require('express');
let router = express.Router();

const SELECT_COUNT_MEDECIN = `
  SELECT id_medecin as id, count(*) as count 
  FROM medecin WHERE mail=? AND password=?
  GROUP BY id_medecin
`;

/* GET users listing. */
router.get('/login', (req, res) => res.render("login", {...req.query}))
  .post('/login', checkLogin, doLogin, (req, res) => res.redirect("/"))
  .get('/logout', doLogout)

function checkLogin(req, res, next) {
  const { email, password } = req.body;
  req.getConnection(function(err, connection) {    
    connection.query(SELECT_COUNT_MEDECIN, [email, password], function(err, results) {
      if (err) return next(err);
      
      if ( !results[0] || results[0].count == 0) {
        return res.redirect("/login?incorrect=1")
      }
      req.idMedecin = results[0].id;
      next();
    });
  });
}

function doLogin(req, res, next) {
  req.session.login({ userId: req.idMedecin})
    .then(() => next());
}

function doLogout(req, res, next) {
  req.session.logout()
    .then(() => res.redirect("/login?logout=1"));
}

module.exports = router;
