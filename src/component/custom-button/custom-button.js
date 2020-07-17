import React from 'react';
import './custom-button.css';

const CustomButton = ({ color, value, icon, additionalClass, ...otherProps }) => (
    <button className={`custom-button ${color && color} ${additionalClass} `} {...otherProps}><i className={icon} /> {value}</button>
)

export default CustomButton;