import React, { useContext, useEffect, useRef, useState } from 'react';
import Tableau3 from './Tableau3';
import axios from 'axios';
import Filtre from './Filtre';
import config from '../../Config';
//import AccessToken from '../AccessToken';
import { AuthContext } from '../../useAuth';
//import { useParams } from 'react-router-dom';

//const TOKEN = config.apiTOKEN; 
const DIRECTUS_URL = config.apiURL;  

//let searchData = [];

const Eleve = () => {
    // État pour stocker les données récupérées depuis Directus
    const [data, setData] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchNom, setSearchNom] = useState('');
    const [searchPrenom, setSearchPrenom] = useState('');
    const [statusParent, setStatusParent] = useState('');
    const [searchClasse, setSearchClasse] = useState('');
    const [classes, setClasses] = useState([]);
    // Récupère les id des classe pour les besoin du composant Filtre
    const [classeIds, setClasseIds] = useState([]); 

    // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
    const myTokenContext = useContext(AuthContext);
    // URL de l'API Directus
    const directusApiUrl = DIRECTUS_URL;

    const ref = useRef();
  
    useEffect(() => {
      // Fonction pour effectuer la requête à Directus
      const fetchData = async () => {
        try {
          //console.log("myTokenContext Eleve: ", myTokenContext);
          // Utilisation de l'API Directus pour récupérer des données (ajustez l'URL en fonction de vos besoins)
          const response = await axios.get(`${directusApiUrl}/items/Eleve?access_token=${myTokenContext.accessToken.access_token}`); //&filter[status][_eq]=actif
          //const response = await axios.get(`${directusApiUrl}/items/operateur?access_token=${TOKEN}`);
         
          // Remplacer les id des classes par leurs noms corresponadants dans le taleau response.data.data
          response.data.data.forEach(item => {
            //classeIds[ref.current.options[item.classe].text] = item.classe;
            item.classe = ref.current.options[item.classe].text; 
          }); 
 
          setData(
            response.data.data.filter( 
                d => { 
                    //console.log("d: ", d);
                    if(searchId !=='' && d.id !== parseInt(searchId)){
                      return false;
                    }
                    if(searchNom !=='' && !d.nom.toLocaleLowerCase().includes(searchNom.toLocaleLowerCase()))
                      return false;
                    if(searchPrenom !=='' && !d.prenom.toLocaleLowerCase().includes(searchPrenom.toLocaleLowerCase()))
                      return false;
                    if(statusParent !=='' && d.status.toLocaleLowerCase() !== statusParent.toLocaleLowerCase())
                      return false;
                    //if(searchClasse !=='' && d.classe !== parseInt(searchClasse))
                    //  return false;
                    return true;
                }
            )
          );
          console.log("data: ", data);
          //console.log("classeIds: ", classeIds);
          console.log("searchClasse: ", searchClasse);
          //console.log("ref.current.options", ref.current.options);
         
        } catch (error) {
          console.error('Erreur lors de la récupération des données depuis Directus:', error);
        }
      }; // Fin fetchData
  
      // Appel de la fonction fetchData lorsque le composant est monté
      fetchData();
    }, [searchId, searchNom, searchPrenom, statusParent, searchClasse]); // Le tableau vide signifie que useEffect s'exécutera uniquement lors du montage initial

    const updateStatusParent = (newStatus) => { // Fonction qui sera appelée un composant fils pour passer un state au parent
      setStatusParent(newStatus);
      //console.log("statusParent: " + statusParent);
    }

    return (
        <>
            <Filtre selectRef={ref}
              searchId={searchId}
              onSearchIdChange={setSearchId}
              searchNom={searchNom}
              onSearchNomChange={setSearchNom}
              searchPrenom={searchPrenom}
              onSearchPrenomChange={setSearchPrenom}
              updateStatusParent={updateStatusParent}
              searchClasse={searchClasse}
              onSearchClasseChange={setSearchClasse}
            />
            <br />
            <Tableau3  eleves={data} />

        </>
    );
  };
  
  export default Eleve;