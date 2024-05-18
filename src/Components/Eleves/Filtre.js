import React, { useState } from 'react'
import Input from './form/Input';
import Radio from './form/Radio';
import SelectListClasse from './form/SelectListClasse';

const Filtre = ({
                    searchId, onSearchIdChange, 
                    searchNom, onSearchNomChange, 
                    searchPrenom, onSearchPrenomChange,  
                    searchClasse, onSearchClasseChange, 
                    updateStatusParent,
                    selectRef,
                }) => {
    const [checkedStatus, setCheckedStatus] = useState('');

    const onCheckedStatusChange = (e) => {
        setCheckedStatus(e.target.value);
        updateStatusParent(e.target.value);
    }

  return (
    <>
        <div className="row">
            <div className="col">
                <Input 
                    placeholder="ID élève" 
                    value={searchId} 
                    onChange={onSearchIdChange} />
            </div>
            <div className="col">
                <SelectListClasse 
                    value={searchClasse} 
                    onChange={onSearchClasseChange} 
                    selectRef={selectRef}
                />
            </div>
            <div className="col">
                <div>Status:</div>
                <Radio 
                    status_name="tous" 
                    status_id="tous" 
                    status_value="" 
                    checkedStatus={checkedStatus}
                    onCheckedStatusChange={onCheckedStatusChange} />
                <Radio 
                    status_name="nouveau" 
                    status_id="nouveau" 
                    status_value="nouveau" 
                    checkedStatus={checkedStatus}
                    onCheckedStatusChange={onCheckedStatusChange} />
                <Radio 
                    status_name="actif" 
                    status_id="actif" 
                    status_value="actif" 
                    checkedStatus={checkedStatus}
                    onCheckedStatusChange={onCheckedStatusChange} />
                <Radio 
                    status_name="inactif" 
                    status_id="inactif" 
                    status_value="inactif" 
                    checkedStatus={checkedStatus}
                    onCheckedStatusChange={onCheckedStatusChange} />
                <Radio 
                    status_name="suspendu" 
                    status_id="suspendu" 
                    status_value="suspendu" 
                    checkedStatus={checkedStatus}
                    onCheckedStatusChange={onCheckedStatusChange} />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Input 
                    placeholder="Nom" 
                    value={searchNom} 
                    onChange={onSearchNomChange} />
            </div>
            <div className="col">
                <Input 
                    placeholder="Prénom" 
                    value={searchPrenom} 
                    onChange={onSearchPrenomChange} />
            </div>
        </div>
    </>
  )
}

export default Filtre;