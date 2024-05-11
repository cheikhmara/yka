import React from 'react'
import Checkbox from './form/Checkbox3';

const Trow3 = ({id, nom, prenom, status, onIsCheckedChange, }) => {

  return (
    <tr indice={id}>
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
    </tr>
  )
}

export default Trow3;