/**
 * @param {string} placeholder
 * @param {string} value
 * @param {(s: string) => void} onChange
 */
import React from 'react';

const InputReadOnly = ({placeholder, value, onChange, readOnly}) => {
  return (
    <div>
        <input 
            type="text" 
            className="form-control" 
            value={value} 
            placeholder={placeholder} 
            onChange={(e) => onChange(e.target.value)} 
            readOnly
        />
    </div>
  )
}

export default InputReadOnly;