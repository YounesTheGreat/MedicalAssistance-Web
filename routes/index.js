const express = require('express');
const router = express.Router();
const dashboardMedecin = require("../business/dashboardMedecin");
const { ajouterPatient, ajouterRendezVous } = require("../business/priseEnCharge");

/* GET home page. */
router.get('/', dashboardMedecin)
    .post('/patients', ajouterPatient)
    .post('/rendezvous', ajouterRendezVous)

module.exports = router;
