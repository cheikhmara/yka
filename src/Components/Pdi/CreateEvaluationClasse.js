import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Input from './form/Input'
import Radio from './form/Radio'
import config from '../../Config';
import SelectListMatiere from './form/SelectListMatiere';
import SelectList from './form/SelectList';
import { Link, useLocation } from 'react-router-dom';
import InputReadOnly from './form/InputReadOnly';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday } from '../datePdi';
import { AuthContext } from '../../useAuth';
import SelectListClasse from '../Eleves/form/SelectListClasse';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  
 
const CreateEvaluationClasse = () => {
    const [classe, setClasse] = useState('1');
    const [matiere, setMatiere] = useState();
    // État pour stocker les données récupérées depuis Directus
    const [items, setItems] = useState([]);
    const [dateDebutEvaluation, setDateDebutEvaluation] = useState(
        formatDateToYYYYMMDD(getLastThursday(new Date()))
    );
    const [dateFinEvaluation, setDateFinEvaluation] = useState(
        formatDateToYYYYMMDD(getNextWednesday())
    );
    const [messageErr, setMessageErr] = useState('');
    const [etatForm, setEtatForm] = useState('');

    // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
    const myTokenContext = useContext(AuthContext);
    // URL de l'API Directus
    const directusApiUrl = DIRECTUS_URL;

    useEffect(() => {
        // Fonction pour effectuer la requête à Directus
        const getItemList = async () => {
            try {
                //if(classe>0){
                    // Utilisation de l'API Directus pour récupérer des données (ajustez l'URL en fonction de vos besoins)
                    const response = await axios.get(`${directusApiUrl}/items/Eleve?filter[classe][_eq]=${classe}&sort[]=id&access_token=${myTokenContext.accessToken.access_token}`); //&filter[status][_eq]=actif
                    //const response = await axios.get(`${directusApiUrl}/items/operateur?access_token=${TOKEN}`);
                    setItems(response.data.data);
                //}
            } catch (error) {
            console.error('Erreur lors de la récupération des données depuis Directus:', error);
            }
        }; // Fin fetchData
        // Appel de la fonction fetchData lorsque le composant est monté
        getItemList(); 
    }, [classe]);

    console.log("items: ", items, "classe: ", classe, "matiere: ", matiere);

    /*const handleSubmit = (e) => {
        e.preventDefault();

        if(
            eleve_id>0 && matiere!=='' && note>=0 && note<=100 
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
        setStatus('published');

        //setEtatForm('');
        //setMessageErr('');
    }*/


  return (
    <>
        <h2>
            Evaluation des élèves de la classe <strong>{classe}</strong>
        </h2>
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
        {/*<form onSubmit={handleSubmit}>
            <div className={etatForm} role="alert">
                {messageErr}
            </div>
            <div className='row'>
                <div className='col'>
                    <label htmlFor='matiere'>Matière</label>
                    <SelectListMatiere value={matiere} onChange={setMatiere} />
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
        </form>*/}
    </>
  )
}

export default CreateEvaluationClasse;