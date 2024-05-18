import React from 'react'

const Radio = ({status_name, status_id, status_value, checkedStatus, onCheckedStatusChange}) => {

  return (
    <>
        <input 
            className="form-check-input" 
            type="radio" 
            value={status_value}
            name={status_name} 
            id={status_id} 
            checked={checkedStatus === status_value} 
            onChange={onCheckedStatusChange} />
        <label className="form-check-label" htmlFor={status_id}>
            {status_value ? status_value : "All"}
        </label>        
    </>
  )
}

export default Radio;