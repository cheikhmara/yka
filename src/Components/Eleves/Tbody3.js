import React, { useState } from 'react'
import Trow3 from './Trow3';

const Tbody3 = ({eleves}) => {
  let rows = [];
  
  //const [estCoche, setEstCoche] = useState(false);
  const [tabCheck, setTabCheck] = useState([]);
  const [tabIndex, setTabIndex] = useState([]);

  const handleIsCheckedChange = (value) => { // Est appelé par le fils Check à l'evenement onIsCheckedChange
    // La fonction de rappel reçoit la variable du fils (Checkbox) et peut la traiter
    //setEstCoche(!estCoche);
    console.log("Coché: ", value);
    setTabCheck([...tabCheck, value]);

    let index = tabIndex.indexOf(value.id);
    if(value.isChecked && index !== -1){
      setTabIndex(...tabIndex, value.id);
    }
      

    //let index = tabCheck.indexOf(value); console.log(index);
    //if(value.isChecked)
    //  setTabCheck([...tabCheck, value]);
    //else if(value.isChecked === false)
    //  setTabCheck(tabCheck.filter(val => value.id !== val.id));
    console.log("tabCheck", tabCheck);
    console.log("tabIndex", tabIndex);
  }

  if(eleves){
    //console.log(eleves);
    for(const eleve of eleves){
      rows.push(
          <Trow3 
              key={eleve.id} 
              id={eleve.id} 
              nom={eleve.nom} 
              prenom={eleve.prenom} 
              status={eleve.status} 
              classe={eleve.classe} 
              onIsCheckedChange={handleIsCheckedChange}      
            />
      );
    }
  }
  return (
    <tbody>
        { rows }
    </tbody>
  )
}

export default Tbody3;