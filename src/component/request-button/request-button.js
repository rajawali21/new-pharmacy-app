import React from 'react';
import './request-button.css';

const RequestButton = ({ icon, value, ...otherProps }) => (
    <div className='request-button' {...otherProps}>
        <span><i className={icon}></i></span>
        <p>{value}</p>
    </div>
)

export default RequestButton;