const { SELECT_MEDECIN, 
  SELECT_PATIENTS_MEDECIN, 
  SELECT_RDV_MEDECIN } = require("./queries");

module.exports = function dashboardMedecin(req, res, next) {
    /* Singleton connection (see dbOptions) */
    req.getConnection(function (err, connection) {    
      if (err) return next(err);    
      const id = req.query.id || 3; // TODO req.session.id;

      /* Informations Medecin */
      connection.query(SELECT_MEDECIN, [ id ], function (err, results) {
        if (err) return next(err);
        const medecin = results[0];
  
        /* Patients chez le Medecin */
        connection.query(SELECT_PATIENTS_MEDECIN, [ id ], function (err, results) {
          if (err) return next(err);
          const patients = results;
  
          /* Rendez-vous du medecin */
          connection.query(SELECT_RDV_MEDECIN, [ id ], function (err, results) {
            if (err) return next(err);
            const rendezVous = results;
  
            /* Afficher Page */
            //console.log(medecin, patients, rendezVous);
            res.render("index", { medecin, patients, rendezVous });
          });
        });
      });
    });
  }