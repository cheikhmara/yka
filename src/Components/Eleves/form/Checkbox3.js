import React, {useState} from 'react'

const Checkbox3 = ({id, onIsCheckedChange}) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleChange = () => {
    setIsChecked(!isChecked);
    const value = {id, isChecked};
    //console.log("value: ", value);
    onIsCheckedChange(value) // Variable de type fonction à passer au composant parent Trow3
  } 

  return (
    <>
      <input 
        className="form-check-input" 
        type="checkbox" 
        id={id} 
        checked={isChecked}
        onChange={handleChange}
        />
    </>
  )
}

export default Checkbox3;