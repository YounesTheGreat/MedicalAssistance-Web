module.exports = {

  SELECT_MEDECIN : `
  SELECT id_medecin AS id, nom, prenom, mail AS email, 
    telephone, specialite, adresse, description,
    date_naissance AS dateNaissance
  FROM medecin
  WHERE id_medecin = ?
  `,

  SELECT_PATIENTS_MEDECIN : `
  SELECT id_patient AS id, nom, prenom FROM patient WHERE id_patient IN (
    SELECT id_patient FROM liste_medecin_patient
    WHERE id_medecin = ?
  )
  `,

  SELECT_RDV_MEDECIN : `
    SELECT id_rendezvous AS id, sujet, heure AS dateHeure, nom, prenom 
    FROM rendezvous R, patient P
    WHERE R.id_patient = P.id_patient
    AND R.id_medecin = ?
  `,

  SELECT_LISTE_PATIENTS : `
    SELECT id_patient as id, nom, prenom FROM patient
    WHERE id_patient NOT IN (
      SELECT id_patient FROM liste_medecin_patient
      WHERE id_medecin = ?
    )
  `,

  INSERT_PATIENT_MEDECIN : `
    INSERT INTO liste_medecin_patient(id_medecin, id_patient)
    VALUES (?, ?)
  `,

  INSERT_RENDEZVOUS_MEDECIN : `
    INSERT INTO rendezvous(id_medecin, id_patient, sujet, heure)
    VALUES (?,?,?,?)
  `,


  SELECT_PATIENT : `
    SELECT id_patient AS id, nom, prenom, 
      mail AS email, telephone, addresse as adresse,
      age, groupesanguin AS groupeSanguin,
      CASE 
        WHEN sex = 0 THEN "M"
        ELSE "F"
      END AS sexe
    FROM patient
    WHERE id_patient = ?
  `,

  SELECT_RDV : `
    SELECT id_rendezvous AS id, nom, prenom, telephone, mail as email,
     sujet, heure AS dateHeure 
    FROM rendezvous, patient
    WHERE rendezvous.id_patient = patient.id_patient
    AND rendezvous.id_rendezvous = ?
  `,
  
  REMOVE_PATIENT_MEDECIN : `
    DELETE FROM liste_medecin_patient
    WHERE id_medecin = ? AND id_patient = ?   
  `,
  
  DELETE_RENDEZ_VOUS : `
      DELETE FROM rendezvous
      WHERE id_rendezvous = ?
  `,

  UPDATE_RENDEZ_VOUS : `
      UPDATE rendezvous
      SET sujet=? heure=?
      WHERE id_rendezvous = ?
  `
}