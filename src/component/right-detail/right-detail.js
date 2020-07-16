import React from 'react';
import './right-detail.css';
import SideContact from '../side-contact/side-contact';

const RightDetail = ({ children, image, active }) => (
    <aside className={`right-detail ${active && 'active'}`}>
        <div className='side-header'>
            <img src={image} alt='sideHeaderImg' />
            <div className='side-header-detail'>
                <h2>Raja Abdullah</h2>
                <p>IGD Officer</p>
                <span className='status online'><i className='fas fa-circle'></i> Available</span>
            </div>
        </div>
        <SideContact />
        {children}
    </aside>
)

export default RightDetail;