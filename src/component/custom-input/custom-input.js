import React from 'react';
import './custom-input.css';

const CustomInput = ({ handleChange, ...otherProps }) => (
    <input onChange={handleChange} className='custom-input' {...otherProps} />
)

export default CustomInput;