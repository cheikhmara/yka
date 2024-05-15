import React, { } from 'react'
import Input from './form/Input';

const Filtre = ({
                    //searchId, onSearchIdChange, 
                    //searchNom, onSearchNomChange, 
                    //searchPrenom, onSearchPrenomChange,  
                    searchEleve, onSearchEleveChange,
                    searchDateDebutEval, onSearchDateDebutEvalChange,
                    searchNote, onSearchNoteChange,
                    searchEnseignant, onSearchEnseignantChange,
                    searchMatiere, onSearchMatiereChange,
                    searchDomaine, onSearchDomaineChange, 
                }) => {

  return (
    <>
        <div className="row">
            <div className="col">
                <Input 
                    placeholder="Matiere" 
                    value={searchMatiere} 
                    onChange={onSearchMatiereChange} />
            </div>
            <div className="col">
                <Input 
                    placeholder="Domaine" 
                    value={searchDomaine} 
                    onChange={onSearchDomaineChange} />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Input 
                    placeholder="Enseignant" 
                    value={searchEnseignant} 
                    onChange={onSearchEnseignantChange} />
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