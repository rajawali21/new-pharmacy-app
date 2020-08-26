import React from 'react';
import './custom-input.css';

const CustomInput = ({ handleChange, size, type, ...otherProps }) => (
    <input type={type} onChange={handleChange} className={`custom-input ${size}`} {...otherProps} />
)

export default CustomInput;