const { INSERT_PATIENT_MEDECIN, SELECT_PATIENT, 
    INSERT_RENDEZVOUS_MEDECIN, SELECT_RDV,
    REMOVE_PATIENT_MEDECIN,
    DELETE_RENDEZ_VOUS } = require("./queries");

exports.ajouterPatient = (req, res, next) => {
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
        if (err) return next(err);    
        const idMedecin = 3; // TODO
        const { idPatient } = req.body

        /* Le Medecin prend en charge le Patient*/
        connection.query(INSERT_PATIENT_MEDECIN, [idMedecin, idPatient], function (err) {
            if (err) return next(err);            
            res.redirect("/");
        });
    });
}

exports.ajouterRendezVous = (req, res, next) => {
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
        if (err) return next(err);    
        const idMedecin = 3; // TODO
        const { idPatient, sujet, date, heure } = req.body

        console.log("Date et heure", date, heure);
        let dateHeure = date + ' ' + heure;
        
        /* RDV entre Medecin et Patient */
        connection.query(INSERT_RENDEZVOUS_MEDECIN, [idMedecin, idPatient, sujet, dateHeure], function (err) {
            if (err) return next(err);
            /* Redirection */
            res.redirect("/");
        });
    });    
}

exports.afficherPatient = (req, res, next) => {
    selectById(req, SELECT_PATIENT,function (err, results) {
        if (err) return next(err);
        const patient = results[0];
        res.render("showPatient", { patient, layout: "popupLayout" });
    });
}

function selectById(req, query, callback) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        const { id } = req.params;
        connection.query(query, [id], callback);
    })
}

exports.afficherRendezVous = (req, res, next) => {
    selectById(req, SELECT_RDV, function(err, results) {
        if (err) return next(err);
        const rendezVous = results[0];
        console.log(rendezVous);
        res.render("showRendezVous", { rendezVous, layout: "popupLayout" });
    });
}

exports.retirerPatient = (req, res, next) => {
    const { connection } = req;
    const idMedecin = 3; // TODO
    const idPatient = req.params.id;

    connection.query(REMOVE_PATIENT_MEDECIN, [idMedecin, idPatient], function(err) {
        if (err) return next(err);            
        res.redirect("/");
    });
}

exports.annulerRendezVous = (req, res, next) => {
    const { connection } = req;
    const idRendezVous = req.params.id;

    connection.query(DELETE_RENDEZ_VOUS, [idRendezVous], function(err) {
        if (err) next(err);
        res.redirect("/");
    });
}

