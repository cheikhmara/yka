import React, { useContext, useEffect, useRef, useState } from 'react';
import Tableau3 from './Tableau3';
import axios from 'axios';
import Filtre from './Filtre';
import config from '../../Config';
//import AccessToken from '../AccessToken';
import { AuthContext } from '../../useAuth';
import { Link, useLocation } from 'react-router-dom';
import { formatDateToYYYYMMDD, getLastThursday, getNextWednesday, getPlusSevenDay } from '../datePdi';
import SelectListDateEvaluation from './form/SelectListDateEvaluation';

//const TOKEN = config.apiTOKEN; 
const DIRECTUS_URL = config.apiURL;  

//let searchData = [];

const Pdi = ({eleve_id=1, dateDebut='', dateFin=''}) => {
    // État pour stocker les données récupérées depuis Directus
    const [data, setData] = useState(null);
    const [searchNote, setSearchNote] = useState('');
    const [searchEnseignant, setSearchEnseignant] = useState('');
    const [searchMatiere, setSearchMatiere] = useState('');
    const [dateDebutEvaluation, setDateDebutEvaluation] = useState(
      dateDebut !=='' ?  dateDebut : formatDateToYYYYMMDD(getLastThursday(new Date()))
    );
    const [dateFinEvaluation, setDateFinEvaluation] = useState(
      dateFin !=='' ?  dateFin : formatDateToYYYYMMDD(getNextWednesday())
    );
    const [semaineEvaluation, setSemaineEvaluation] = useState(dateDebutEvaluation);

    // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
    const myTokenContext = useContext(AuthContext);
    const ref = useRef();

    const location = useLocation();
    // Utilisation de URLSearchParams pour extraire les paramètres de la requête
    const queryParams = new URLSearchParams(location.search);
    // Récupère le paramètre 'eleve' passé par get dans le len Link
    const eleve = parseInt(queryParams.get('eleve'))>0 ? 
                      parseInt(queryParams.get('eleve')) : eleve_id; 
    const nom = queryParams.get('nom');
    const prenom = queryParams.get('prenom');
  
    useEffect(() => {
      if(semaineEvaluation !== ''){
        //dateDebutEvaluation = semaineEvaluation;
        setDateDebutEvaluation(
          semaineEvaluation
        );
        //dateFinEvaluation = getPlusSevenDay(semaineEvaluation, 6);
        setDateFinEvaluation(
          getPlusSevenDay(semaineEvaluation, 6)
        );
      }
      // Fonction pour effectuer la requête à Directus
      const fetchData = async () => {
        try {         
          const response = await axios.get(`${DIRECTUS_URL}/items/evaluation`, {
            params: {
              access_token: myTokenContext.accessToken.access_token,
              filter: {
                eleve: {
                  _eq: eleve
                },
                date_debut_evaluation: {
                  _eq: dateDebutEvaluation
                },
                date_fin_evaluation: {
                  _eq: dateFinEvaluation
                },
              },
              sort: ['-id']
            }
          });
          console.log("response.data.data: ", response.data.data);
          
          // Remplacer les id des classes par leurs noms corresponadants dans le taleau response.data.data
          response.data.data.forEach(item => {
            if(ref.current.options[item.matiere].text!=='')
              item.matiere = ref.current.options[item.matiere].text;  
          });
          //console.log("ref.current.options: ", ref.current.options);
          console.log(data);
         
          setData(
            response.data.data.filter( 
                d => { 
                    //console.log(d);
                    if(searchNote !=='' &&  d.note !== parseInt(searchNote))
                      return false;
                    if(searchEnseignant !=='' && d.enseignant !== parseInt(searchEnseignant))
                      return false;
                    if(searchMatiere !=='' && d.matiere !== parseInt(searchMatiere))
                      return false;
                    return true;
                }
            )
          );
          
        } catch (error) {
          console.error('Erreur lors de la récupération des dates d\'évaluation:', error);
        }
      };
  
      // Appel de la fonction fetchData lorsque le composant est monté
      fetchData();
    }, [ // Le tableau vide signifie que useEffect s'exécutera uniquement lors du montage initial
        semaineEvaluation,
        dateDebutEvaluation,
        dateFinEvaluation,
        searchNote,
        searchEnseignant, 
        searchMatiere, 
  ]); 

  console.log("semaineEvaluation: ", semaineEvaluation); 


    return (
        <>
            <h2>
              Programme de Développement Individuel de l'élève  <strong>{prenom} {nom}</strong>
            </h2>
            <SelectListDateEvaluation 
                value={semaineEvaluation} 
                onChange={setSemaineEvaluation} />
            <h3>
              Période du {dateDebutEvaluation} au {dateFinEvaluation}
            </h3>
            <Filtre 
              selectRef={ref}
              searchNote={searchNote}
              onSearchNoteChange={setSearchNote}
              searchEnseignant={searchEnseignant}
              onSearchEnseignantChange={setSearchEnseignant}
              searchMatiere={searchMatiere}
              onSearchMatiereChange={setSearchMatiere}

            />
            <br />
            <Tableau3  evaluations={data} />
            <br />
            <Link 
                className="" 
                style={{color: "#614a4ce6", textDecoration: "none"}}
                to="/eleve">
                <button type="button" className="btn btn-info btn-xs">
                    Liste élèves
                </button>
            </Link>
        </>
    );
  };
  
  export default Pdi; 