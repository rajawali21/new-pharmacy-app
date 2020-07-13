import React from 'react';
import './header-officer.css';

// Other Library
import { NavLink } from 'react-router-dom';

// Other Component
import Logo from '../../assets/logo/logo.jpeg';


const HeaderOfficer = () => (
    <div className='header-container'>
        <header className='header-officer'>
            <div className='left-side'>
                <div className='header-logo'>
                    <img src={Logo} alt='HeaderLogo' />
                    <h1>Pharmacy App</h1>
                </div>
                <div className='header-menu'>
                    <NavLink exact to='/officerhome' className='nav-item' activeClassName='active'>Home</NavLink>
                    <NavLink exact to='/officerrequest' className='nav-item' activeClassName='active'>Request</NavLink>
                </div>
            </div>
            <div className='right-side'>
                <span><i className='fas fa-bell'></i></span>
                <img src={Logo} alt='UserImage' />
                <span className='officer-name'>Bahrul Ulum</span>
                <span><i className='fas fa-sort-down arrow-down'></i></span>
            </div>
        </header>
    </div>
)

export default HeaderOfficer;