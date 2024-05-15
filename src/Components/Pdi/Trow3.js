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
        <Link className="dropdown-item" to="/eleve">Liste eleves</Link>
      </td>  
    </tr>
  )
}

export default Trow3;