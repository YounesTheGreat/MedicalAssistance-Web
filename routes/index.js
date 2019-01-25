const express = require('express');
const router = express.Router();
const dashboardMedecin = require("../business/dashboardMedecin");
const { ajouterPatient, ajouterRendezVous, 
    afficherPatient, afficherRendezVous } = require("../business/medecinService");

/* GET home page. */
router.get('/', dashboardMedecin)
    .post('/patients', ajouterPatient)
    .post('/rendezvous', ajouterRendezVous)
    .get('/patients/:id', afficherPatient)
    .get('/rendezvous/:id', afficherRendezVous)

module.exports = router;
