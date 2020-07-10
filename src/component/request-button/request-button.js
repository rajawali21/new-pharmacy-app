import React from 'react';
import './request-button.css';

const RequestButton = ({ icon, value }) => (
    <div className='request-button'>
        <span><i className={icon}></i></span>
        <p>{value}</p>
    </div>
)

export default RequestButton;