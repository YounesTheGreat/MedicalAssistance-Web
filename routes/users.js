const express = require('express');
let router = express.Router();

const SELECT_COUNT_MEDECIN = `
  SELECT id_medecin as id, count(*) as count 
  FROM medecin WHERE mail=? AND password=?
  GROUP BY id_medecin
`;

const INSERT_MEDECIN = `
  INSERT INTO medecin(nom, prenom, mail, password,
    telephone, specialite, date_naissance, description,
    adresse)
  VALUES (?,?,?,? ,?,?,?,? ,?)
`;

/* GET users listing. */
router.get('/login', (req, res) => res.render("login", {...req.query}))
  .post('/login', checkLogin, doLogin, (req, res) => res.redirect("/"))
  .use('/logout', doLogout, (req, res) => res.redirect("/login?logout=1"))
  .get('/signup', doLogout, (req, res) => res.render("signup"))
  .post('/signup', doSignup, doLogin, (req, res) => res.redirect("/"));

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
    .then(() => next());
}

function doSignup(req, res, next) {
    const { nom, prenom, email,  password, telephone, 
      specialite, dateNaissance, description, adresse } = req.body;
    let params = [ nom, prenom, email,  password, telephone, 
      specialite, dateNaissance, description, adresse ];
    req.getConnection(function(err, connection) {
      if (err) return next(err);
      connection.query(INSERT_MEDECIN, params, function(err, result) {
        if (err) return next(err);
        req.idMedecin = result.insertId;
        next(); 
      });
    });
}

module.exports = router;
