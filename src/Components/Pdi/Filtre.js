import React, { } from 'react'
import Input from './form/Input';
import SelectList from './form/SelectList';
import SelectListMatiere from './form/SelectListMatiere';

const Filtre = ({
                    //searchId, onSearchIdChange, 
                    //searchNom, onSearchNomChange, 
                    //searchPrenom, onSearchPrenomChange,  
                    //searchEleve, onSearchEleveChange,
                    //searchDateDebutEval, onSearchDateDebutEvalChange,
                    searchNote, onSearchNoteChange,
                    searchEnseignant, onSearchEnseignantChange,
                    searchMatiere, onSearchMatiereChange,
                    //searchDomaine, onSearchDomaineChange, 
                }) => {

  return (
    <>
        <div className="row">
            <div className="col">
                <SelectListMatiere value={searchMatiere} onChange={onSearchMatiereChange} />
            </div>
            <div className="col">
                <SelectList value={searchEnseignant} onChange={onSearchEnseignantChange} />
            </div>
            <div className="col">
                <Input 
                    placeholder="Note" 
                    value={searchNote} 
                    onChange={onSearchNoteChange} />
            </div>
        </div>
    </>
  )
}

export default Filtre;