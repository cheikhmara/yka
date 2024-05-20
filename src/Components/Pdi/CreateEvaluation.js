import React, { useState } from 'react'
import axios from 'axios';
import Input from './form/Input'
import Radio from './form/Radio'
import config from '../../Config';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  
 
const CreateEvaluation = () => { 
    const [eleve, setEleve] = useState();
    const [matiere, setMatiere] = useState(); 
    const [note, setNote] = useState();
    const [appreciation, setApprecation] = useState('');
    const [enseignant, setEnseignant] = useState();
    const [dateDebutEvaluation, setDateDebutEvaluation] = useState('2024-05-16');
    const [dateFinEvaluation, setDateFinEvaluation] = useState('2024-05-22');
    const [status, setStatus] = useState('published');
    const [messageErr, setMessageErr] = useState('');
    const [etatForm, setEtatForm] = useState('');

    const onCheckedStatusChange = (e) => {
        setStatus(e.target.value);     
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            eleve!=='' && matiere!=='' && note!=='' 
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
        setDateDebutEvaluation('');
        setDateFinEvaluation('');
        setStatus('published');

        //setEtatForm('');
        //setMessageErr('');
    }
    //console.log(nom, prenom, status);


  return (
    <form onSubmit={handleSubmit}>
        <div className={etatForm} role="alert">
            {messageErr}
        </div>
        <div className='row'>
            <div className='col'>
                <label htmlFor='eleve'>Eleve</label>
                <Input 
                    id="eleve"
                    placeholder="Eleve"
                    value={eleve} 
                    onChange={setEleve} 
                    />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <label htmlFor='matiere'>Matière</label>
                <Input 
                    id="matiere"
                    placeholder="Matière" 
                    value={matiere} 
                    onChange={setMatiere} 
                    />
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
                <Input 
                    id="enseignant"
                    placeholder="enseignant"
                    value={enseignant} 
                    onChange={setEnseignant} 
                    />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <label htmlFor='dateDebutEvaluation'>Debut Evaluation</label>
                <Input 
                    id="dateDebutEvaluation"
                    placeholder="Debut Evaluation"
                    value={dateDebutEvaluation} 
                    onChange={setDateDebutEvaluation} 
                    />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <label htmlFor='dateFinEvaluation'>Fin Evaluation</label>
                <Input 
                    id="dateFinEvaluation"
                    placeholder="Fin Evaluation"
                    value={dateFinEvaluation} 
                    onChange={setDateFinEvaluation} 
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
    </form>
  )
}

export default CreateEvaluation;