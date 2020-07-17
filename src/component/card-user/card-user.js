import React from 'react';
import './card-user.css';

import sampleImage from '../../assets/sample/officer-1.jpg';
import CustomButton from '../custom-button/custom-button';

const CardUser = ({ buttonColor }) => {
    return (
        <div className='card-user'>
            <div className='card-user-header'>
                <img src={sampleImage} alt='sampleImage' />
                <h3>Rajawali Abdullah Affan</h3>
            </div>
            <div className='card-user-contact'>
                <span className='contact-item'>rajawali@officer.com</span>
                <span className='contact-item'>083844892839</span>
            </div>
            <div className='card-user-footer'>
                <CustomButton color={buttonColor} additionalClass='width-90' value='Details' />
            </div>
        </div>
    )
}

export default CardUser;