import React from 'react';
import './form-group.css';

const FormGroup = ({ children, remove }) => (
    <div className='form-group'>
        {children}
        <span className='form-group-close' onClick={remove}>&#10005;</span>
    </div>
)

export default FormGroup;