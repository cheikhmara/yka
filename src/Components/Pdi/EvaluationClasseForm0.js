import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../Config';
import { AuthContext } from '../../useAuth';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday } from '../datePdi';
import Input from './form/Input';
import SelectListMatiere from './form/SelectListMatiere';
import SelectListClasse from '../Eleves/form/SelectListClasse';

const EvaluationClasseForm0 = ({dateDebut='2024-05-23', dateFin='2024-05-29'}) => {
const [students, setStudents] = useState([]);
const [grades, setGrades] = useState({});
  
const [eleve, setEleve] = useState([]);
const [classe, setClasse] = useState(1);
const [matiere, setMatiere] = useState();
const [note, setNote] = useState([]);
const [appreciation, setAppreciation] = useState([]);
const [enseignant, setEnseignant] = useState([]);
const dateDebutEvaluation = (dateDebut !=='' ? 
                            dateDebut : formatDateToYYYYMMDD(getLastThursday(new Date())));
const dateFinEvaluation = (dateFin !=='' ? 
                            dateFin : formatDateToYYYYMMDD(getNextWednesday()));

  // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
  const myTokenContext = useContext(AuthContext);
  // URL de l'API Directus
  const DIRECTUS_URL = config.apiURL;  
  const directusApiUrl = DIRECTUS_URL;
  const TOKEN = config.apiTOKEN;


  useEffect(() => {
    // Remplacez l'URL par l'adresse de votre API pour obtenir la liste des élèves
    axios.get(`${directusApiUrl}/items/Eleve?filter[classe][_eq]=${classe}&sort[]=id&access_token=${myTokenContext.accessToken.access_token}`)
      .then(response => {
        setStudents(response.data.data);
        console.log("students: ", students);
        // Initialiser les notes pour chaque élève à une valeur vide
        const initialGrades = response.data.data.reduce((acc, student) => {
          acc[student.id] = '';
          return acc;
        }, {});
        setGrades(initialGrades);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des élèves', error);
      });
  }, [classe, matiere]);

  const handleGradeChange = (studentId, event) => {
    console.log("event.target: ", event.target);
    const { value } = event.target;
    setGrades({
      ...grades,
      [studentId]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const gradesData = students.map(student => ({
      studentId: student.id,
      grade: grades[student.id]
    }));
    console.log("students: ", students);
    console.log("grades: ", grades);
   
    //if(parseInt(eleve)>0 && parseInt(classe)>0 && parseInt(matiere)>0 && parseInt(note)>=0 && parseInt(note)<=100) {
    if(true) {
        try {
            // Remplacez l'URL par l'adresse de votre API pour enregistrer les notes
            //const response = await axios.post('https://example.com/api/grades', gradesData);
            const response = axios({
              method: 'post',
              url: `${DIRECTUS_URL}/items/evaluation?access_token=${TOKEN}`,
              data: gradesData,
              /*data: {
                  eleve: parseInt(eleve),
                  matiere: parseInt(matiere),
                  note: parseInt(note),
                  appreciation: appreciation,
                  enseignant: parseInt(enseignant),
                  date_debut_evaluation: dateDebutEvaluation,
                  date_fin_evaluation: dateFinEvaluation,
                  status: "published",
              },*/ 
          });
            console.log('Notes enregistrées avec succès', response.data.data);
          } catch (error) {
            console.error('Erreur lors de l\'enregistrement des notes', error);
          }
    }else{
        console.log('Vous devez renseigner correctement tous les champs avant de soumettre le formulaire.');
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
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
        {students.map(student => (
            <div key={student.id} style={{ marginBottom: '10px' }}>
                <span><strong>{student.nom} {student.prenom}</strong> (Classe: {classe}, Matière: {matiere})</span>
                <input
                    type="text"
                    value={grades[student.id]}
                    onChange={(event) => handleGradeChange(student.id, event)}
                    placeholder="Saisir la note ici"
                    required
                />
                {/** Ajouter ici les champs appreciation et enseignant*/}
            </div>
        ))}
        <button type="submit" className="btn btn-primary">Enregistrer les notes</button>
        </form>
    </>
  );
};

export default EvaluationClasseForm0;