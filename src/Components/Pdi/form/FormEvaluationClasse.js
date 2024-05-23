import React from 'react';
import Input from './Input';
import SelectList from './SelectList';
import InputReadOnly from './InputReadOnly';

const FormEvaluationClasse = ({
                eleve,
                matiere,
                note, 
                appreciation, 
                enseignant,
                dateDebutEvaluation,
                dateFinEvaluation, 
                setNoteChange, 
                setAppreciationChange, 
                setEnseignantChange
            }) => { 
  return (
    <div className='row'>
        <div className='col' style={{display:"none"}}>
            <InputReadOnly 
                placeholder="Date debut Evaluation"
                value={dateDebutEvaluation} 
                readOnly="readOnly"
                />
            <InputReadOnly
                placeholder="Date fin Evaluation"
                value={dateFinEvaluation} 
                readOnly="readOnly"
                />
        </div>
        <div className='col'>
            <label htmlFor='eleve'>Eleve</label>
            <InputReadOnly 
                placeholder="Eleve"
                value={eleve} 
                readOnly="readOnly"
                />
        </div>
        <div className='col'>
            <label htmlFor='matiere'>Matière</label>
            <InputReadOnly 
                placeholder="Matiere"
                value={matiere} 
                readOnly="readOnly"
                />
        </div>
        <div className='col'>
            <label htmlFor='note'>Note</label>
            <Input 
                id="note"
                placeholder="Note"
                value={note} 
                onChange={setNoteChange} 
                />
        </div>
        <div className='col'>
            <label htmlFor='appreciation'>Appreciation</label>
            <Input 
                id="appreciation"
                placeholder="Appreciaton"
                value={appreciation} 
                onChange={setAppreciationChange} 
                />
        </div>
        <div className='col'>
            <label htmlFor='enseignant'>Enseignant</label>
            <SelectList value={enseignant} onChange={setEnseignantChange} />
        </div>
    </div>
  )
}

export default FormEvaluationClasse;