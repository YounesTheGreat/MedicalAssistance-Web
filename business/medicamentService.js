const { SELECT_MEDICAMENTS_CNOPS, SELECT_MEDICAMENT_CNOPS,
    SELECT_PRESCRIPTION, INSERT_MEDICAMENT } = require("./queries");

exports.selectMedicamentsCNOPS = (req, res, next) => {
    const { connection } = req;
    connection.query(SELECT_MEDICAMENTS_CNOPS, [],  function(err, results){
        if (err) return next(err);
        res.locals.medicaments =  filtrerMedicaments(results, req.query );
        next();
    });
}

function filtrerMedicaments(medicaments, params) {
    if (!params) return;    
    const columns = Object.keys(params);
    return medicaments.filter( medicament => {
        for (let i =0; i<columns.length; i++){
            let A = ""+medicament[columns[i]];
            let B = ""+params[columns[i]];
            if (A.includes(B) === false) {
                return false;
            }             
        }
        return true;
    });
}

exports.insertMedicamentPrescription = (req, res, next) => {
    const { connection } = req;    
    const { idPrescription } = res.locals.prescription;
    const { NOM, DOSAGE1, UNITE_DOSAGE1 } = res.locals.medicamentCNOPS;
    const { indications } = req.body;    
    connection.query(INSERT_MEDICAMENT, [NOM, `Dosage=${DOSAGE1}${UNITE_DOSAGE1} - ${indications}`,idPrescription], function(err){
        if (err) return next(err);
        next();
    });     
}

exports.selectPrescription = (req, res, next) => {
    const { connection, idMedecin } = req;
    const idPatient = req.body["idPatient"] || req.params.id;   
    connection.query(SELECT_PRESCRIPTION, [idMedecin, idPatient], function(err, results) {
        if (err) return next(err);
        res.locals.prescription = results[0];
        next();
    });
}


exports.selectMedicamentCNOPS = (req, res, next) => {
    const { connection } = req;
    const codeMedicament = req.body["codeMedicament"] || req.params.id;
    connection.query(SELECT_MEDICAMENT_CNOPS, [codeMedicament], function(err, results) {
        if (err) return next(err);
        res.locals.medicamentCNOPS = results[0];
        next();
    });
}
