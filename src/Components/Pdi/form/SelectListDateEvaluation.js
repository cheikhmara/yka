import React, { useEffect, useState } from 'react'
import { getPlusSevenDay, getThursdays } from '../../datePdi';

const SelectListDateEvaluation = ({value, onChange}) => {

    const [lesJeudis, setLesJeudis] = useState([]);

    useEffect(() => {
        try {
            setLesJeudis(getThursdays());
        } catch (error) {
            console.error('Erreur lors de la récupération du tableau setLesJeudis:', error);
        }

    }, []);
    //console.log("lesJeudis: ", lesJeudis);
    
  return (
    <div>
        <select style={{width: "30%", margin: "0 auto" }}
            value={value} onChange={(e) => onChange(e.target.value)} 
            className="form-control" 
            id="selectDateEval" 
            >
                <option value="">--Choisissez une Période--</option>
                {lesJeudis.map((ceJeudi) => (
                    <option key={ceJeudi} value={ceJeudi}>
                        {ceJeudi} au {getPlusSevenDay(ceJeudi, 6)}
                    </option>
                ))}
        </select>
    </div>
  )
}

export default SelectListDateEvaluation;