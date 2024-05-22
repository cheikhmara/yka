import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
//import Input from './form/Input'
//import Radio from './form/Radio'
import config from '../../Config';
import SelectListMatiere from './form/SelectListMatiere';
//import SelectList from './form/SelectList';
import { Link } from 'react-router-dom';
//import InputReadOnly from './form/InputReadOnly';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday } from '../datePdi';
import { AuthContext } from '../../useAuth';
import SelectListClasse from '../Eleves/form/SelectListClasse';
import FormEvaluationClasse from './form/FormEvaluationClasse';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  
 
const CreateEvaluationClasse = () => {
    const [eleve, setEleve] = useState(1);
    const [classe, setClasse] = useState(2);
    const [matiere, setMatiere] = useState(16);
    const [note, setNote] = useState(100);
    const [appreciation, setAppreciation] = useState('Doit redoubler d\'effort');
    const [enseignant, setEnseignant] = useState(2);
    const [dateDebutEvaluation, setDateDebutEvaluation] = useState(
        formatDateToYYYYMMDD(getLastThursday(new Date()))
    );
    const [dateFinEvaluation, setDateFinEvaluation] = useState(
        formatDateToYYYYMMDD(getNextWednesday())
    );
    const [items, setItems] = useState([]);
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
                    //if(items.length>0)
                    //    setEleve({ id:items[0].id, nom:items[0].nom, prenom:items[0].prenom });
                    //console.log("eleve: ", eleve);
                //}
            } catch (error) {
            console.error('Erreur lors de la récupération des données depuis Directus:', error);
            }
        }; // Fin fetchData
        // Appel de la fonction fetchData lorsque le composant est monté
        getItemList(); 
    }, [classe]);

    console.log("items: ", items, "classe: ", classe, "matiere: ", matiere);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            eleve>0 && matiere>0 && note>=0 && note<=100 
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
                        status: "published",
                    }, 
                });
                console.log("response1: ", response1);
                setEtatForm('alert alert-success');
                setMessageErr(`
                    Infos soumises avec succès {Eleve: ${eleve}, Matiere: ${matiere}, Note: ${note},
                    appreciation:' ${appreciation}, enseignant: ${enseignant}, 
                    dateDebutEvaluation: ${dateDebutEvaluation}, dateFinEvaluation: ${dateFinEvaluation}} 
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
        setAppreciation('');
        setEnseignant('');
        //setStatus('published');

        //setEtatForm('');
        //setMessageErr('');
    }

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
        <hr />
        <form onSubmit={handleSubmit}>
            <div className={etatForm} role="alert">
                {messageErr}
            </div>
            <FormEvaluationClasse 
                eleve={eleve}
                matiere={matiere}
                note={note} 
                appreciation={appreciation}
                enseignant={enseignant}
                setNoteChange={setNote}
                setAppreciationChange={setAppreciation}
                setEnseignantChange={setEnseignant}
                dateDebutEvaluation={dateDebutEvaluation}
                dateFinEvaluation={dateFinEvaluation}
            />
            <button 
                type="submit"
                className="btn btn-primary" >Enregistrer
            </button>
        </form>
    </>
  )
}

export default CreateEvaluationClasse;