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
    SELECT sujet, heure AS dateHeure, nom, prenom 
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

}