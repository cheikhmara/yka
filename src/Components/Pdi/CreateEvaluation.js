import React, { useState } from 'react'
import axios from 'axios';
import Input from './form/Input'
import Radio from './form/Radio'
import config from '../../Config';
import SelectListMatiere from './form/SelectListMatiere';
import SelectList from './form/SelectList';
import { Link, useLocation } from 'react-router-dom';
import InputReadOnly from './form/InputReadOnly';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  
 
const CreateEvaluation = () => { 

    // Récuperation des parametres passer par GET sur url
    const location = useLocation();
    // Utilisation de URLSearchParams pour extraire les paramètres de la requête
    const queryParams = new URLSearchParams(location.search);

    const [eleve, setEleve] = useState(queryParams.get('eleve'));
    const [matiere, setMatiere] = useState(); 
    const [note, setNote] = useState();
    const [appreciation, setApprecation] = useState('');
    const [enseignant, setEnseignant] = useState();
    const [dateDebutEvaluation, setDateDebutEvaluation] = useState(
        formatDateToYYYYMMDD(getLastThursday(new Date()))
    );
    const [dateFinEvaluation, setDateFinEvaluation] = useState(
        formatDateToYYYYMMDD(getNextWednesday())
    );
    const [status, setStatus] = useState('published');
    const [messageErr, setMessageErr] = useState('');
    const [etatForm, setEtatForm] = useState('');

    // Récupère le paramètre 'eleve' passé par get dans le len Link
    const eleve_id = parseInt(queryParams.get('eleve'))>0 ? parseInt(queryParams.get('eleve')) : eleve; 
    const nom = queryParams.get('nom');
    const prenom = queryParams.get('prenom');

    const onCheckedStatusChange = (e) => {
        setStatus(e.target.value);     
    }

    /*function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }*/

    function formatDateToYYYYMMDD(date) {
        if (!(date instanceof Date)) {
          throw new TypeError("The provided value is not a valid Date object");
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getNextWednesday(currentDate = new Date()) {
        // Obtenir le jour de la semaine (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
        const dayOfWeek = currentDate.getDay();
        // Calculer le nombre de jours jusqu'au prochain mercredi
        const daysUntilNextWednesday = (3 - dayOfWeek + 7) % 7;
        // Si aujourd'hui est déjà mercredi, nous devons ajouter 7 jours pour obtenir le prochain mercredi
        const daysToAdd = daysUntilNextWednesday === 0 ? 7 : daysUntilNextWednesday;
        // Créer la date du prochain mercredi
        const nextWednesday = new Date(currentDate);
        nextWednesday.setDate(currentDate.getDate() + daysToAdd);
        return nextWednesday;
    }

    function getLastThursday(fromDate) {
        // Obtenir le jour de la semaine de la date donnée
        const dayOfWeek = fromDate.getDay();
        // Calculer le nombre de jours jusqu'au dernier jeudi
        const daysSinceLastThursday = (dayOfWeek - 4 + 7) % 7;
        // Si aujourd'hui est déjà jeudi, nous devons soustraire 7 jours pour obtenir le dernier jeudi
        const daysToSubtract = daysSinceLastThursday === 0 ? 7 : daysSinceLastThursday;
        // Créer la date du dernier jeudi
        const lastThursday = new Date(fromDate);
        lastThursday.setDate(fromDate.getDate() - daysToSubtract);
        return lastThursday;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            eleve_id>0 && nom!=='' && prenom!== '' && matiere!=='' && note>=0 && note<=100 
            //&& dateDebutEvaluation!=null && dateFinEvaluation!=null && status !==''
            ) {
            try{
                const response1 = axios({
                    method: 'post',
                    url: `${DIRECTUS_URL}/items/evaluation?access_token=${TOKEN}`,
                    data: {
                        eleve: parseInt(eleve),
                        matiere: parseInt(matiere),
                        note: parseInt(note),
                        appreciation: appreciation,
                        enseignant: parseInt(enseignant),
                        date_debut_evaluation: dateDebutEvaluation,
                        date_fin_evaluation: dateFinEvaluation,
                        status: status,
                    }, 
                });
                console.log("response1: ", response1);
                setEtatForm('alert alert-success');
                setMessageErr(`
                    Infos soumises avec succès {Eleve: ${eleve}, Matiere: ${matiere}, Note: ${note},
                    appreciation:' ${appreciation}, enseignant: ${enseignant}, 
                    dateDebutEvaluation: ${dateDebutEvaluation}, dateFinEvaluation: ${dateFinEvaluation},
                    stas: ${status}} 
                `);
            }catch (error) {
                console.error('Erreur lors de la récupération des données depuis Directus:', error);
            }
        }    
        else{
            setEtatForm('alert alert-danger');
            setMessageErr(`
                Vous devez renseigner correctement tous les champs avant de soumettre le formulaire.
            `);
        }
        console.log(messageErr);
        setEleve('');
        setMatiere('');
        setNote('');
        setApprecation('');
        setEnseignant('');
        //setDateDebutEvaluation('');
        //setDateFinEvaluation('');
        setStatus('published');

        //setEtatForm('');
        //setMessageErr('');
    }
    //console.log(nom, prenom, status);


  return (
    <>
        <h2>
            Evaluation de l'élève  <strong>{prenom} {nom}</strong>
        </h2>
        <form onSubmit={handleSubmit}>
            <div className={etatForm} role="alert">
                {messageErr}
            </div>
            {/*<div className='row'>
                <div className='col'>
                    <label htmlFor='eleve'>Eleve</label>
                    <Input 
                        id="eleve"
                        placeholder="Eleve"
                        value={eleve} 
                        onChange={setEleve} 
                        />
                </div>
            </div>*/}
            <div className='row'>
                <div className='col'>
                    <label htmlFor='matiere'>Matière</label>
                    <SelectListMatiere value={matiere} onChange={setMatiere} />
                    {/*<Input 
                        id="matiere"
                        placeholder="Matière" 
                        value={matiere} 
                        onChange={setMatiere} 
                    />*/}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='note'>Note</label>
                    <Input 
                        id="note"
                        placeholder="Note"
                        value={note} 
                        onChange={setNote} 
                        />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='appreciation'>Appreciation</label>
                    <Input 
                        id="appreciation"
                        placeholder="Appreciaton"
                        value={appreciation} 
                        onChange={setApprecation} 
                        />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='enseignant'>Enseignant</label>
                    <SelectList value={enseignant} onChange={setEnseignant} />
                    {/*<Input 
                        id="enseignant"
                        placeholder="enseignant"
                        value={enseignant} 
                        onChange={setEnseignant} 
                    />*/}
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='dateDebutEvaluation'>Debut Evaluation</label>
                    <InputReadOnly 
                        id="dateDebutEvaluation"
                        placeholder="Debut Evaluation"
                        value={dateDebutEvaluation} 
                        onChange={setDateDebutEvaluation} 
                        readOnly="readOnly"
                        />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='dateFinEvaluation'>Fin Evaluation</label>
                    <InputReadOnly 
                        id="dateFinEvaluation"
                        placeholder="Fin Evaluation"
                        value={dateFinEvaluation} 
                        onChange={setDateFinEvaluation} 
                        readOnly="readOnly"
                        />
                </div>
            </div>
            <div className='row'>
                <label htmlFor='published'>Status</label>
                <div className='col'> 
                    <Radio 
                        status_name="status" 
                        status_id="published"
                        status_value="published"
                        checkedStatus={status}
                        onCheckedStatusChange={onCheckedStatusChange} 
                        />
                </div>
                <div className='col'>
                    <Radio 
                        status_name="status"
                        status_id="draft"
                        status_value="draft"
                        checkedStatus={status}
                        onCheckedStatusChange={onCheckedStatusChange} 
                        />
                </div>
                <div className='col'>
                    <Radio  
                        status_name="status"
                        status_id="archived"
                        status_value="archived"
                        checkedStatus={status} 
                        onCheckedStatusChange={onCheckedStatusChange} 
                        />
                </div>
            </div>
            <br />
            <button 
                type="submit" 
                className="btn btn-primary" >Créer une Evaluation
            </button>
            <Link 
                className="" 
                style={{color: "#614a4ce6", textDecoration: "none"}}
                to="/eleve">
                <button type="button" className="btn btn-info btn-xs">
                    Liste élèves
                </button>
            </Link>
        </form>
    </>
  )
}

export default CreateEvaluation;