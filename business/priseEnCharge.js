const { INSERT_PATIENT_MEDECIN, INSERT_RENDEZVOUS_MEDECIN} = require("./queries");

function ajouterPatient(req, res, next) {
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
        if (err) return next(err);    
        const idMedecin = 3; // TODO
        const { idPatient } = req.body

        /* Le Medecin prend en charge le Patient*/
        connection.query(INSERT_PATIENT_MEDECIN, [idMedecin, idPatient], function (err) {
            if (err) return next(err);            
            /* Redirection */
            res.redirect("/");
        });
    });
}

function ajouterRendezVous(req, res, next){
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
        if (err) return next(err);    
        const idMedecin = 3; // TODO
        const { idPatient, sujet, dateHeure } = req.body

        /* RDV entre Medecin et Patient */
        connection.query(INSERT_RENDEZVOUS_MEDECIN, [idMedecin, idPatient, sujet, dateHeure], function (err) {
            if (err) return next(err);
            /* Redirection */
            res.redirect("/");
        });
    });    
}

module.exports = { ajouterPatient, ajouterRendezVous };