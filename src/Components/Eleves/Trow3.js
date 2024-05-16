import React from 'react'
import Checkbox from './form/Checkbox3';
import { Link } from 'react-router-dom';

const Trow3 = ({id, nom, prenom, status, classe, onIsCheckedChange,}) => {

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
      <td>{classe}</td>
      <td>
        <Link 
          className="" style={{color: "#614a4ce6", textDecoration: "none"}}
          to={ "/pdi?eleve=" + id + "&nom=" + nom + "&prenom=" + prenom }>
            <button type="button" className="btn btn-info btn-xs">
              Pdi
            </button>
        </Link>
      </td>
    </tr>
  )
} 

export default Trow3;