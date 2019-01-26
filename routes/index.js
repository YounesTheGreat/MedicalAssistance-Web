const express = require('express');
const router = express.Router();
const easySession = require("easy-session");

const {  selectInfoMedecin, selectPatientsMedecin,
    selectRDVsMedecin, selectPatientsNotWithMedecin } = require("../business/dashboardMedecin");
const { ajouterPatient, ajouterRendezVous, 
    afficherPatient, afficherRendezVous,
    retirerPatient, annulerRendezVous,
    editRendezVous, updateRendezVous } = require("../business/medecinService");
const { selectMedicamentsCNOPS, selectMedicamentCNOPS,
    selectPrescription, insertMedicamentPrescription } = require("../business/medicamentService");

/* GET home page. */
router.use(easySession.isLoggedIn(redirectToLogin))
    .use(getDatabaseConnection)
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
    
router.post('/prescription',
    selectMedicamentCNOPS,
    selectPrescription,
    insertMedicamentPrescription,
    (req,res) => res.redirect("back"));



function getDatabaseConnection(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) next(err);
        req.connection = connection;
        next();
    });
}    

function getIdMedecin(req, res, next) {
    if (req.session.isLoggedIn()) {
        req.idMedecin = req.session.userId;
        res.locals.userId = req.session.userId;
        next();
    } else {
        next("Not Logged In ?!");
    }
}

function redirectToLogin(req, res, err) {
    console.log(err);
    res.redirect("/login?needLogin=1");
}

module.exports = router;
