import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tableau2 from './Tableau2';
import Filtre from '../Eleves/Filtre';
import config from '../../Config';
import { AuthContext } from '../../useAuth';

const TOKEN = config.apiTOKEN; 
const DIRECTUS_URL = config.apiURL;  

const Note = () => {
  const [data, setData] = useState([]);
  const [eleves, setEleves] = useState([]);
  const tabs = [];
  const [searchId, setSearchId] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [searchPrenom, setSearchPrenom] = useState('');
  const [statusParent, setStatusParent] = useState('');

  // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
  const myTokenContext = useContext(AuthContext);
  //console.log("myTokenContext: ", myTokenContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response1 = await axios.get(`${directusURL}/items/eleve`);
        const response1 = await axios(
          {
            method: 'get',
            url: `${DIRECTUS_URL}/items/Eleve?access_token=${myTokenContext.accessToken.access_token}&filter[status][_eq]=actif&sort[]=-id`, 
          } //&&limit=3&offset=2&page=2&sort[]=nom&sort[]=-date_created
        );
        setEleves(response1.data.data);

        response1.data.data.map(eleve => { 
          // Pour chaque eleve, récupere ses evaluations
          axios( 
            {
              method: 'get',
              url: `${DIRECTUS_URL}/items/evaluation?filter[eleve][_eq]=${eleve.id}&access_token=${myTokenContext.accessToken.access_token}&sort[]=-date_fin_evaluation`,
              //&sort[]=-date_fin_evaluation -> pour prendre la evaluation de fin de validite posterieure
            }
          ).then(
              lesevaluations => { 
                console.log("Eleve (", eleve.id, ")"); /*******marac********* */
                console.log("Evaluations: ", lesevaluations.data.data);   //******marac***** */             
                if(lesevaluations.data.data.length >0 ){ 
                  // Filtrer les doublons concernant les eleves d'abord dans de construire le resultat à afficher
                  const eleveTrouve = tabs.find(op => op.id === eleve.id);
                  if(!eleveTrouve){
                    tabs.push(
                      {
                        id: eleve.id, // Seul l'element id suffit pour verifier les doublons
                        nom: eleve.nom,
                        prenom: eleve.prenom,
                        status: eleve.status,
                        evaluation_id: lesevaluations.data.data[1].id,
                        date_debut_evaluation: lesevaluations.data.data[1].date_debut_evaluation,
                        date_fin_evaluation: lesevaluations.data.data[1].date_fin_evaluation,
                        evaluation_eleve_id: lesevaluations.data.data[1].eleve,
                        matiere: lesevaluations.data.data[1].matiere,
                        note: lesevaluations.data.data[1].note,
                      }
                    );
                    
                    //setData(tabs);
                    setData(
                      tabs.filter(
                          d => {
                              if(searchId !=='' && d.id !== parseInt(searchId)){
                                  return false;
                              }
                              if(searchNom !=='' && !d.nom.toLocaleLowerCase().includes(searchNom.toLocaleLowerCase()))
                                  return false;
                              if(searchPrenom !=='' && !d.prenom.toLocaleLowerCase().includes(searchPrenom.toLocaleLowerCase()))
                                  return false;
                              if(statusParent !=='' && d.status.toLocaleLowerCase() !== statusParent.toLocaleLowerCase())
                                  return false;
                              return true;
                          }
                      )
                  );

                  } // Fin if(!eleveTrouve)
                }
              }
            ).catch(
              err => {
                console.error(err);
              }
            )
          }
        );
        //console.log("data", data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }; 
    
    fetchData();
  }, [searchId, searchNom, searchPrenom, statusParent]); // Assurez-vous que le tableau de dépendances est vide pour exécuter l'effet une seule fois

  const updateStatusParent = (newStatus) => { // Fonction qui sera appelée un composant fils pour passer un state au parent
    setStatusParent(newStatus);
    //console.log("statusParent: " + statusParent);
  }

  return (
    <>
      <Filtre 
            searchId={searchId}
            onSearchIdChange={setSearchId}
            searchNom={searchNom}
            onSearchNomChange={setSearchNom}
            searchPrenom={searchPrenom}
            onSearchPrenomChange={setSearchPrenom}
            updateStatusParent={updateStatusParent}
        />
      <Tableau2  eleves={data} />
    </>
  );
};

export default Note;
