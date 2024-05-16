import React from 'react'
import { Link } from 'react-router-dom';

const Trow3 = ({id, enseignant, matiere, note}) => {

  return (
    <tr indice={id} id={"row"+id}>
      {/*<td>{id}</td>
      <td>{enseignant}</td>*/}
      <td>{matiere}</td>
      <td>{note}</td>
      <td>
        <Link 
          className="" 
          style={{color: "#614a4ce6", textDecoration: "none"}}
          to="/eleve">
            <button type="button" className="btn btn-info btn-xs">
              Liste élèves
            </button>
        </Link>
      </td>  
    </tr>
  )
}

export default Trow3;