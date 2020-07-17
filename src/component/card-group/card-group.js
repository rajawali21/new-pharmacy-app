import React from 'react';
import './card-group.css';

const CardGroup = ({ children }) => {
    return (
        <div className='card-group'>
            {children}
        </div>
    )
}

export default CardGroup;