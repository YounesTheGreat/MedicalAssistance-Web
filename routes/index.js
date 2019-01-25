const express = require('express');
const router = express.Router();
const dashboardMedecin = require("../business/dashboardMedecin");
const { ajouterPatient, ajouterRendezVous, 
    afficherPatient, afficherRendezVous,
    retirerPatient, annulerRendezVous,
    editRendezVous, updateRendezVous } = require("../business/medecinService");

/* GET home page. */
router.use(databaseConnection)
    .get('/', dashboardMedecin)
    .post('/patients', ajouterPatient)
    .post('/rendezvous', ajouterRendezVous)
    .post('/rendezvous/:id', updateRendezVous)
    .get('/patients/:id/delete', retirerPatient)
    .get('/patients/:id', afficherPatient)
    .get('/rendezvous/:id/delete', annulerRendezVous)
    .get('/rendezvous/:id/edit', editRendezVous)
    .get('/rendezvous/:id', afficherRendezVous)


function databaseConnection(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) next(err);
        req.connection = connection;
        next();
    });
}    

module.exports = router;
