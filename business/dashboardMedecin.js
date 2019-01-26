const { SELECT_MEDECIN, 
  SELECT_PATIENTS_MEDECIN, 
  SELECT_RDV_MEDECIN,
  SELECT_LISTE_PATIENTS } = require("./queries");

/** Informations Medecin */  
exports.selectInfoMedecin = (req, res, next) => {
  const { connection, idMedecin } = req;  
  connection.query(SELECT_MEDECIN, [ idMedecin ], function (err, results) {
    if (err) return next(err);
    res.locals.medecin = results[0];
    next();
  });
}

/** Patients chez le Medecin */
exports.selectPatientsMedecin = (req, res, next) => {
  const { connection, idMedecin } = req;  
  connection.query(SELECT_PATIENTS_MEDECIN, [ idMedecin ], function (err, results) {
    if (err) return next(err);
    res.locals.patients = results;
    next();
  });
}

 /** Rendez-vous du medecin */
exports.selectRDVsMedecin = (req, res, next) => {
  const { connection, idMedecin } = req;   
  connection.query(SELECT_RDV_MEDECIN, [ idMedecin ], function (err, results) {
    if (err) return next(err);
    res.locals.rendezVous = results;
    next();
  });
}

/* Liste des patiens NOT WITH MEDECIN pour <select> add Patient */
exports.selectPatientsNotWithMedecin = (req, res, next) => {
  const { connection, idMedecin } = req;     
  connection.query(SELECT_LISTE_PATIENTS, [ idMedecin ], function (err, results) {
    if (err) return next(err);
    res.locals.listePatients = results;
    next();
  });
}

