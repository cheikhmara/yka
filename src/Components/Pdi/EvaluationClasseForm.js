import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../Config';
import { AuthContext } from '../../useAuth';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday } from '../datePdi';
import SelectListMatiere from './form/SelectListMatiere';
import SelectListClasse from '../Eleves/form/SelectListClasse';
import SelectList from './form/SelectList';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  

const EvaluationClasseForm = ({dateDebut='2024-05-23', dateFin='2024-05-29'}) => {
const [students, setStudents] = useState([]);
 const [notes, setNotes] = useState({});

const [classe, setClasse] = useState();
const [matiere, setMatiere] = useState();
const [enseignant, setEnseignant] = useState();
const dateDebutEvaluation = (dateDebut !=='' ? 
                            dateDebut : formatDateToYYYYMMDD(getLastThursday(new Date())));
const dateFinEvaluation = (dateFin !=='' ? 
                            dateFin : formatDateToYYYYMMDD(getNextWednesday()));


  //Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
  const myTokenContext = useContext(AuthContext);
  // URL de l'API Directus
  const directusApiUrl = DIRECTUS_URL;

  useEffect(() => {
    // Remplacez l'URL par l'adresse de votre API pour obtenir la liste des élèves
    if(classe>0)
    axios.get(`${directusApiUrl}/items/Eleve?filter[classe][_eq]=${classe}&sort[]=id&access_token=${myTokenContext.accessToken.access_token}`)
      .then(response => {
        setStudents(response.data.data);
        // Initialiser les notes et appreciations pour chaque élève à une valeur vide
        const initialNotes = response.data.data.reduce((acc, student) => {
          acc[student.id] = { 
                eleve: student.id, 
                note: '', 
                appreciation: '', 
                enseignant: enseignant,
                matiere: matiere,
                classe: classe, 
                date_debut_evaluation: dateDebutEvaluation,
                date_fin_evaluation: dateFinEvaluation
              };
          return acc;
        }, {});
        setNotes(initialNotes);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des élèves', error);
      });
  }, [classe, matiere, enseignant]);

  //console.log("notes(initiaux): ", notes);

  const handleNoteChange = (studentId, event) => {
    const { name, value } = event.target;
    setNotes(prevNotes => ({
      ...prevNotes,
      [studentId]: {
        ...prevNotes[studentId],
        [name]: value
      }
    }));
    //console.log("notes(dans handleNoteChange): ", notes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const notesData = students.map(student => ({
      classe: classe,
      enseignant: enseignant,
      matiere: matiere,
      eleve: student.id,
      note: notes[student.id].note,
      appreciation: notes[student.id].appreciation,
      date_debut_evaluation: dateDebutEvaluation,
      date_fin_evaluation: dateFinEvaluation
    }));

    //console.log("notesData: ", notesData);
   
    try {
      // Remplacez l'URL par l'adresse de votre API pour enregistrer les notes
      const response = await axios.post(`${DIRECTUS_URL}/items/evaluation?access_token=${TOKEN}`, notesData);
      console.log('Notes enregistrées avec succès', response.data.data);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des notes', error);
    }
  };

  return (
    <>
      <h2>Evaluation des élèves de la classe de <strong>{classe}</strong></h2>
        <h3>Période du <strong>{dateDebutEvaluation}</strong> au <strong>{dateFinEvaluation}</strong></h3>
      <div className='row'>
          <div className="col">
          <label htmlFor='matiere'>Classe</label>
              <SelectListClasse 
                  collection="classe"
                  value={classe} 
                  onChange={setClasse} 
              />
          </div>
          <div className='col'>
              <label htmlFor='matiere'>Matière</label>
              <SelectListMatiere
                  value={matiere} 
                  onChange={setMatiere} 
              />  
          </div>
          <div className='col'>
              <label htmlFor='matiere'>Enseignant</label>
              <SelectList
                  value={enseignant} 
                  onChange={setEnseignant} 
              />
          </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        {students.map(student => (
          <div key={student.id} style={{ marginBottom: '10px' }}>
            <span>{student.prenom} {student.nom} (classe: {student.classe})</span>
            <input
              type="text"
              name="note"
              value={notes[student.id].note}
              onChange={(event) => handleNoteChange(student.id, event)}
              placeholder="Note"
              required
            />
            <input
              type="text"
              name="appreciation"
              value={notes[student.id].appreciation}
              onChange={(event) => handleNoteChange(student.id, event)}
              placeholder="Appreciation"
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Enregistrer les notes</button>
      </form>
    </>
  );
};

export default EvaluationClasseForm;