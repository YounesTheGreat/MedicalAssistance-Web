const { SELECT_MEDECIN, 
  SELECT_PATIENTS_MEDECIN, 
  SELECT_RDV_MEDECIN,
  SELECT_LISTE_PATIENTS } = require("./queries");

module.exports = function dashboardMedecin(req, res, next) {
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
      if (err) return next(err);    
      const idMedecin = req.query.id || 3; // TODO req.session.id;

      /* Informations Medecin */
      connection.query(SELECT_MEDECIN, [ idMedecin ], function (err, results) {
        if (err) return next(err);
        const medecin = results[0];
  
        /* Patients chez le Medecin */
        connection.query(SELECT_PATIENTS_MEDECIN, [ idMedecin ], function (err, results) {
          if (err) return next(err);
          const patients = results;
  
          /* Rendez-vous du medecin */
          connection.query(SELECT_RDV_MEDECIN, [ idMedecin ], function (err, results) {
            if (err) return next(err);
            const rendezVous = results;
            
            /* Liste des patiens pour <select> add Patient */
            connection.query(SELECT_LISTE_PATIENTS, [ idMedecin ], function (err, results) {
              if (err) return next(err);
              const listePatients = results;
              
              /* Afficher Page */
              res.render("index", { medecin, patients, rendezVous, listePatients });
            });            
          });
        });
      });
    });
  }