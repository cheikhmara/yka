import React, { useContext, useEffect, useState } from 'react';
import Tableau3 from './Tableau3';
import axios from 'axios';
import Filtre from './Filtre';
import config from '../../Config';
//import AccessToken from '../AccessToken';
import { AuthContext } from '../../useAuth';
import { Link, useLocation } from 'react-router-dom';

//const TOKEN = config.apiTOKEN; 
const DIRECTUS_URL = config.apiURL;  

//let searchData = [];

const Pdi = ({eleve_id=1, date_debut_evaluation='2024-04-18', date_fin_evaluation='2024-04-24'}) => {
    // État pour stocker les données récupérées depuis Directus
    const [data, setData] = useState(null);
    //const [searchId, setSearchId] = useState('');
    //const [searchNom, setSearchNom] = useState('');
    //const [searchPrenom, setSearchPrenom] = useState('');
    //const [searchEleve, setSearchEleve] = useState('');
    //const [searchDateDebutEval, setSearchDateDebutEval] = useState('');
    const [searchNote, setSearchNote] = useState('');
    const [searchEnseignant, setSearchEnseignant] = useState('');
    const [searchMatiere, setSearchMatiere] = useState('');
    //const [searchDomaine, setSearchDomaine] = useState('');
    //const [searchDateDebutEval, setSearchDateDebutEval] = useState('');
    //const [searchDateFinEval, setSearchDateFinEval] = useState('');

    // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
    const myTokenContext = useContext(AuthContext);

    // URL de l'API Directus
    //const directusApiUrl = DIRECTUS_URL;

    const location = useLocation();
    // Utilisation de URLSearchParams pour extraire les paramètres de la requête
    const queryParams = new URLSearchParams(location.search);
    // Récupère le paramètre 'eleve' passé par get dans le len Link
    const eleve = parseInt(queryParams.get('eleve'))>0 ? 
                      parseInt(queryParams.get('eleve')) : eleve_id; 
    const nom = queryParams.get('nom');
    const prenom = queryParams.get('prenom');
  
    useEffect(() => {
      // Fonction pour effectuer la requête à Directus
      const fetchData = async () => {
        try {
          /*const response = await axios(
            {
              method: 'get',
              url: `${DIRECTUS_URL}/items/evaluation?access_token=${myTokenContext.accessToken.access_token}&filter[eleve][_eq]=${eleve_id}&sort[]=-id`, 
            } //&&limit=3&offset=2&page=2&sort[]=nom&sort[]=-date_created
          );*/
          
          const response = await axios.get(`${DIRECTUS_URL}/items/evaluation`, {
            params: {
              access_token: myTokenContext.accessToken.access_token,
              filter: {
                eleve: {
                  _eq: eleve
                },
                date_debut_evaluation: {
                  _eq: date_debut_evaluation
                },
                date_fin_evaluation: {
                  _eq: date_fin_evaluation
                },
              },
              sort: ['-id']
            }
          });
          
          console.log("response.data.data: ", response.data.data);
         
          setData(
            response.data.data.filter( 
                d => { 
                    //console.log(d);
                    /*if(searchId !=='' && d.id !== parseInt(searchId)){
                      return false;
                    }*/
                    /*if(searchNom !=='' && !d.nom.toLocaleLowerCase().includes(searchNom.toLocaleLowerCase()))
                      return false;
                    if(searchPrenom !=='' && !d.prenom.toLocaleLowerCase().includes(searchPrenom.toLocaleLowerCase()))
                      return false;
                    if(searchEleve !=='' && d.eleve !== parseInt(searchEleve))
                      return false;
                    if(searchDateDebutEval !=='' && !d.date_debut_evaluation.toLocaleLowerCase().includes(searchDateDebutEval.toLocaleLowerCase()))
                      return false;
                    if(searchDomaine !=='' && d.domaine !== parseInt(searchDomaine))
                      return false;*/
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
          console.error('Erreur lors de la récupération des données de l\'API:', error);
        }
      };
  
      // Appel de la fonction fetchData lorsque le composant est monté
      fetchData();
    }, [ // Le tableau vide signifie que useEffect s'exécutera uniquement lors du montage initial
        //searchId, 
        //searchNom, 
        //searchPrenom, 
        //searchEleve,
        //searchDomaine
        searchNote,
        searchEnseignant, 
        searchMatiere, 
  ]); 

    /*const updateStatusParent = (newStatus) => { // Fonction qui sera appelée un composant fils pour passer un state au parent
      setStatusParent(newStatus);
      //console.log("statusParent: " + statusParent); 
    }*/

    return (
        <>
            <h2>
              Programme de Développement Individuel de l'élève  <strong>{prenom} {nom}</strong>
            </h2>
            <h3>
              Période du {date_debut_evaluation} au {date_fin_evaluation}
            </h3>
            <Filtre
             //searchId={searchId}, onSearchIdChange={setSearchId}
              //searchNom={searchNom}
              //onSearchNomChange={setSearchNom}
              //searchPrenom={searchPrenom}
              //onSearchPrenomChange={setSearchPrenom}
              //searchDateDebutEval={searchDateDebutEval}
              //onSearchDateDebutEvalChange={setSearchDateDebutEval}
              //searchEleve={searchEleve}
              //onSearchEleveChange={setSearchEleve}
              //searchDomaine={searchDomaine}
              //onSearchDomaineChange={setSearchDomaine}
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