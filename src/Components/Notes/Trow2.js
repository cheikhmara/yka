import React from 'react'

const Trow2 = ({id, nom, prenom, status, evaluation_id, date_debut_evaluation, date_fin_evaluation, evaluation_eleve_id}) => {
  return (
    <tr>
        <td>{id}</td>
        <td>{nom}</td>
        <td>{prenom}</td>
        <td>{status}</td>
        <td>{evaluation_id}</td>
        <td>{date_debut_evaluation}</td>
        <td>{date_fin_evaluation}</td>
        <td>{evaluation_eleve_id}</td>
    </tr>
  )
}

export default Trow2;