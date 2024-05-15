import React from 'react'
import Checkbox from './form/Checkbox3';
import { Link } from 'react-router-dom';

const Trow3 = ({id, nom, prenom, status, onIsCheckedChange, }) => {

  /*function showNotes(e) {
    e.preventDefault();
    console.log(e.target.id);
    console.log('Liste Notes eleve.');
     // Récupère la ligne cliquée
     const clickedTR = document.getElementById(e.target.id);
     const nextSiblingTR = document.getElementById(e.target.id).nextElementSibling;
     //table.insertBefore(clickedTR, nextSiblingTR);
  }*/

  return (
    <tr indice={id} id={"row"+id}>
      <td>
        <Checkbox 
            id={id}
            onIsCheckedChange={onIsCheckedChange}
        />
      </td>
      <td>{id}</td>
      <td>{nom}</td>
      <td>{prenom}</td>
      <td>{status}</td>
      <td>
        <Link 
          className="dropdown-item" 
          to={ "/pdi?eleve=" + id + "&nom=" + nom + "&prenom=" + prenom }>PDI</Link>
      </td>
    </tr>
  )
}

export default Trow3;