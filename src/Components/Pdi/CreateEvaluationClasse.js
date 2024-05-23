import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../Config';
import SelectListMatiere from './form/SelectListMatiere';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday } from '../datePdi';
//import { AuthContext } from '../../useAuth';
import SelectListClasse from '../Eleves/form/SelectListClasse';
import FormEvaluationClasse from './form/FormEvaluationClasse';

const TOKEN = config.apiTOKEN;
const DIRECTUS_URL = config.apiURL;  
 
const CreateEvaluationClasse = (
                    eleve_id='1', 
                    classe_id='2', 
                    matiere_id='16', 
                    dateDebut='2024-05-16', 
                    dateFin='2024-05-22'
                ) => {
    const [eleve, setEleve] = useState(parseInt(1));
    console.log("eleve: ", eleve);
    const [classe, setClasse] = useState(parseInt(classe_id));
    const [matiere, setMatiere] = useState(parseInt(matiere_id));
    const [note, setNote] = useState();
    const [appreciation, setAppreciation] = useState('');
    const [enseignant, setEnseignant] = useState();
    const dateDebutEvaluation = (dateDebut !=='' ? 
                                dateDebut : formatDateToYYYYMMDD(getLastThursday(new Date())));
    const dateFinEvaluation = (dateFin !=='' ? 
                              dateFin : formatDateToYYYYMMDD(getNextWednesday()));
    //const [items, setItems] = useState([]);
    const [messageErr, setMessageErr] = useState('');
    const [etatForm, setEtatForm] = useState('');

    // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
    //const myTokenContext = useContext(AuthContext);
    // URL de l'API Directus
    //const directusApiUrl = DIRECTUS_URL;

    useEffect(() => {
        // Fonction pour effectuer la requête à Directus
        const getItemList = async () => {
            try {
                // Utilisation de l'API Directus pour récupérer des données (ajustez l'URL en fonction de vos besoins)
                //const response = await axios.get(`${directusApiUrl}/items/Eleve?filter[classe][_eq]=${classe}&sort[]=id&access_token=${myTokenContext.accessToken.access_token}`); //&filter[status][_eq]=actif
                //const response = await axios.get(`${directusApiUrl}/items/operateur?access_token=${TOKEN}`);
                //setItems(response.data.data);
                console.log("eleve: ", eleve, "classe: ", classe, "matiere: ", matiere);
            } catch (error) {
            console.error('Erreur lors de la récupération des données depuis Directus:', error);
            }
        }; // Fin fetchData
        // Appel de la fonction fetchData lorsque le composant est monté
        getItemList();
        
    }, [eleve, classe, matiere, note, enseignant, appreciation]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            eleve>0 && classe>0 && matiere>0 && note>=0 && note<=100 
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
        /*setEleve('');
        setMatiere('');
        setNote('');
        setAppreciation('');
        setEnseignant('');*/

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