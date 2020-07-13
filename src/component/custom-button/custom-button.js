import React from 'react';
import './custom-button.css';

const CustomButton = ({ color, value, ...otherProps }) => (
    <button className={`custom-button ${color && color}`} {...otherProps}>{value}</button>
)

export default CustomButton;