import React from 'react';
import './card-user.css';

import CustomButton from '../custom-button/custom-button';

const CardUser = ({ buttonColor, data }) => {
    return (
        <div className='card-user'>
            <div className='card-user-header'>
                <img src={data.photoUrl} alt='sampleImage' />
                <h3>{data.displayName}</h3>
            </div>
            <div className='card-user-contact'>
                <span className='contact-item'>{data.email}</span>
                <span className='contact-item'>{data.noHp}</span>
            </div>
            <div className='card-user-footer'>
                <CustomButton color={buttonColor} additionalClass='width-90' value='Details' />
            </div>
        </div>
    )
}

export default CardUser;