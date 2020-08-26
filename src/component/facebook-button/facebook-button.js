import React from 'react';
import './facebook-button.css';
import FacebookLogo from '../../assets/logo/facebook-logo.svg';

const FacebookButton = () => (
    <div className="facebook-btn">
        <div className="facebook-icon-wrapper">
            <img className="facebook-icon" src={FacebookLogo} alt='FacebookButton' />
        </div>
        <p className="btn-text"><b>Sign In With Facebook</b></p>
    </div>
)

export default FacebookButton;