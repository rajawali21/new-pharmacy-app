import React from 'react';
import './header-blank.css';

// Other Component
import Logo from '../../assets/logo/logo.jpeg';

const HeaderBlank = () => (
    <header className='header-blank'>
        <div className='container'>
            <img src={Logo} alt='Logo' />
            <h1 className='logo-text'>Pharmacy App</h1>
        </div>
    </header>
)

export default HeaderBlank;