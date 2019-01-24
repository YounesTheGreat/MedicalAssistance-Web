
const SELECT_MEDECIN = `
SELECT id_medecin AS id, nom, prenom, mail AS email, 
  telephone, specialite, adresse, description,
  date_naissance AS dateNaissance
FROM medecin
WHERE id_medecin = ?
`;

const SELECT_PATIENTS_MEDECIN = `
SELECT * FROM patient WHERE id_patient IN (
  SELECT id_patient FROM liste_medecin_patient
  WHERE id_medecin = ?
)
`;

const SELECT_RDV_MEDECIN = `
  SELECT sujet, heure, nom, prenom 
  FROM rendezvous R, patient P
  WHERE R.id_patient = P.id_patient
  AND R.id_medecin = ?
`;

module.exports = { SELECT_MEDECIN, 
    SELECT_PATIENTS_MEDECIN, 
    SELECT_RDV_MEDECIN 
};