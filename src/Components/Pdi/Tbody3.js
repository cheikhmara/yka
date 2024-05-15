import React, { } from 'react'
import Trow3 from './Trow3';

const Tbody3 = ({evaluations}) => {
  let rows = [];

  if(evaluations){
    //console.log(evaluations);
    for(const evaluation of evaluations){
      rows.push(
          <Trow3 
              key={evaluation.id} 
              id={evaluation.id} 
              //nom={evaluation.nom} 
              //prenom={evaluation.prenom} 
              //eleve={evaluation.eleve}
              enseignant={evaluation.enseignant} 
              domaine={evaluation.domaine} 
              matiere={evaluation.matiere} 
              note={evaluation.note} 
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