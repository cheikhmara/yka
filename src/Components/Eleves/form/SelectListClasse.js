import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../../Config';
import { AuthContext } from '../../../useAuth';

//const TOKEN = config.apiTOKEN; 
const DIRECTUS_URL = config.apiURL;  
// URL de l'API Directus
const directusApiUrl = DIRECTUS_URL;

const SelectListClasse = ({collection='classe', value, onChange, selectRef}) => {

        // État pour stocker les données récupérées depuis Directus
        const [items, setItems] = useState([]);
        
        // Utilisation du contexte AuthContext déclaré par le fichier useAuth.js
        const myTokenContext = useContext(AuthContext);
        
        useEffect(() => {
            // Fonction pour effectuer la requête à Directus
            const getItemList = async () => {
                try {
                // Utilisation de l'API Directus pour récupérer des données (ajustez l'URL en fonction de vos besoins)
                const response = await axios.get(`${directusApiUrl}/items/${collection}?access_token=${myTokenContext.accessToken.access_token}&sort[]=id`); //&filter[status][_eq]=actif
                //const response = await axios.get(`${directusApiUrl}/items/operateur?access_token=${TOKEN}`);
                
                setItems( 
                    response.data.data
                );
                console.log("Items: ", items)
                
                } catch (error) {
                console.error('Erreur lors de la récupération des données depuis Directus:', error);
                }
            }; // Fin fetchData
            // Appel de la fonction fetchData lorsque le composant est monté
            getItemList();
        }, []);

        //console.log("ref: ", selectRef);
    
  return (
    <div>
        <select ref={selectRef}
            value={value} onChange={(e) => onChange(e.target.value)} 
            className="form-control" 
            id="selectClasse" 
            >
                <option value="">--Choisissez une classe--</option>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.classe} 
                    </option>
                ))}
        </select>
    </div>
  )
}

export default SelectListClasse;