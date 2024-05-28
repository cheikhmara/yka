import React from 'react'
//import { Link } from 'react-router-dom';

const Trow3 = ({id, enseignant, matiere, note}) => {
  let bgcolor = '';
  if(note < 30)
    bgcolor = '#FF0000';
  else if(note >= 30 && note < 50)
    bgcolor = '#FF6D01';
  else if(note >= 50 && note < 70)
    bgcolor = '#FFFF00';
  else if(note >= 70 && note < 90)
    bgcolor = '#00FF00';
  else if(note >= 90 && note <= 100)
    bgcolor = '#38761D';

  return (
    <tr indice={id} id={"row"+id}>
      {/*<td>{id}</td>
      <td>{enseignant}</td>*/}
      <td>{matiere}</td>
      <td style={{ backgroundColor: bgcolor }}>{note}</td>
      <td>
        {/*<Link  
          className="" 
          style={{color: "#614a4ce6", textDecoration: "none"}}
          to="/eleve">
            <button type="button" className="btn btn-info btn-xs">
              Liste élèves
            </button>
        </Link>*/}
      </td>  
    </tr>
  )
}

export default Trow3;
