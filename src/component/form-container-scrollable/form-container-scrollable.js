import React from 'react';
import './form-container-scrollable.css';

const FormContainerScrollable = ({ children, onSubmit }) => (
    <div className='form-container-scrollable' onSubmit={onSubmit}>
        {children}
    </div>
)

export default FormContainerScrollable;