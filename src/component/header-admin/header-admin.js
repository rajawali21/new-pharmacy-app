import React, { useState } from 'react';
import './header-admin.css';

// Other Library
import { NavLink, withRouter, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { connect } from 'react-redux';

// Other Component
import Logo from '../../assets/logo/logo.jpeg';


const HeaderAdmin = ({ history, currentUser }) => {

    const { displayName, photoUrl } = currentUser;

    const [option, setOption] = useState(false);

    const handleClick = () => {
        setOption(!option)
    }

    const handleLogout = () => {
        auth.signOut().then(() => history.push('/'))
    }

    return (
        <div className='header-container'>
            <header className='header-admin'>
                <div className='left-side'>
                    <div className='header-logo'>
                        <img src={Logo} alt='HeaderLogo' />
                        <h1>Pharmacy App</h1>
                    </div>
                    <div className='header-menu'>
                        <NavLink exact to='/adminhome' className='nav-item' activeClassName='active'>Home</NavLink>
                        <NavLink exact to='/listadmin' className='nav-item' activeClassName='active'>Admin</NavLink>
                        <NavLink exact to='/listofficer' className='nav-item' activeClassName='active'>Petugas</NavLink>
                        <NavLink exact to='/listdistributor' className='nav-item' activeClassName='active'>Distributor</NavLink>
                        <NavLink exact to='/listdepartment' className='nav-item' activeClassName='active'>Department</NavLink>
                        <NavLink exact to='/listmedicine' className='nav-item' activeClassName='active'>Obat</NavLink>
                        <NavLink exact to='/listrequest' className='nav-item' activeClassName='active'>Request</NavLink>
                        <NavLink exact to='/listdistribution' className='nav-item' activeClassName='active'>Distribusi</NavLink>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='user-info'>
                        <span><i className='fas fa-bell'></i></span>
                        <img src={photoUrl} alt='UserImage' onClick={handleClick} />
                        <span className='admin-name' onClick={handleClick}>{displayName}</span>
                        <span><i className='fas fa-sort-down arrow-down' onClick={handleClick}></i></span>
                    </div>
                </div>
            </header>
            {option && <div className={`header-option`}>
                <Link to='/usersetting' className='header-option-item'><i className='fas fa-cog'></i> Setting</Link>
                <span className='header-option-item' onClick={handleLogout}><i className='fas fa-power-off'></i> Logout</span>
            </div>}

        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToProps)(HeaderAdmin));