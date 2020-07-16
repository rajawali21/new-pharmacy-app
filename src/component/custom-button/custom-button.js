import React from 'react';
import './custom-button.css';

const CustomButton = ({ color, value, icon, ...otherProps }) => (
    <button className={`custom-button ${color && color} `} {...otherProps}><i className={icon} /> {value}</button>
)

export default CustomButton;