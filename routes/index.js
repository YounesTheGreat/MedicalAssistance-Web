const express = require('express');
const router = express.Router();
const {  selectInfoMedecin, selectPatientsMedecin,
    selectRDVsMedecin, selectPatientsNotWithMedecin } = require("../business/dashboardMedecin");
const { ajouterPatient, ajouterRendezVous, 
    afficherPatient, afficherRendezVous,
    retirerPatient, annulerRendezVous,
    editRendezVous, updateRendezVous } = require("../business/medecinService");
const { selectMedicamentsCNOPS } = require("../business/medicamentService");

/* GET home page. */
router.use(databaseConnection)
    .use(getIdMedecin);
    
router.get('/', selectInfoMedecin,
    selectPatientsMedecin,
    selectRDVsMedecin,
    selectPatientsNotWithMedecin,
    (req, res) => res.render("index"));

router.post('/patients', ajouterPatient)
    .post('/rendezvous', ajouterRendezVous)
    .post('/rendezvous/:id', updateRendezVous)
    .get('/patients/:id/delete', retirerPatient)
    .get('/patients/:id', afficherPatient)
    .get('/rendezvous/:id/delete', annulerRendezVous)
    .get('/rendezvous/:id/edit', editRendezVous)
    .get('/rendezvous/:id', afficherRendezVous);

router.get('/medicaments', 
    selectPatientsMedecin, selectMedicamentsCNOPS,
    (req, res) => res.render("medicaments", { ...req.query }));
    

//router.post('/prescrire', )


function databaseConnection(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) next(err);
        req.connection = connection;
        next();
    });
}    

function getIdMedecin(req, res, next) {
    req.idMedecin = req.session && req.session.id ? req.session.id : 3;
    next();
}

module.exports = router;
