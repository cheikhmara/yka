import React from 'react'
import Trow2 from './Trow2';

const Tbody2 = ({eleves}) => {
  let rows = [];
  if(eleves){
    //console.log(eleves);
    for(const eleve of eleves){
      rows.push(
        <Trow2 
            key={eleve.id} 
            id={eleve.id} 
            nom={eleve.nom} 
            prenom={eleve.prenom} 
            status={eleve.status}
            evaluation_id={eleve.evaluation_id}
            date_debut_evaluation={eleve.date_debut_evaluation}
            date_fin_evaluation={eleve.date_fin_evaluation}
            evaluation_eleve_id={eleve.evaluation_eleve_id}
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

export default Tbody2;