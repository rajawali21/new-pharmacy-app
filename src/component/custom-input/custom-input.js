import React from 'react';
import './custom-input.css';

const CustomInput = ({ handleChange, size, ...otherProps }) => (
    <input onChange={handleChange} className={`custom-input ${size}`} {...otherProps} />
)

export default CustomInput;