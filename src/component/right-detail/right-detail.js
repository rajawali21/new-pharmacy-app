import React from 'react';
import './right-detail.css';

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
        <div className='side-contact'>
            <h3 className='contact-header'>Contact Information</h3>
            <div className='contact-items'>
                <span className='contact-title'>Office Telp</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>(021)-8767-2930</span>
            </div>
            <div className='contact-items'>
                <span className='contact-title'>Mobile Phone :</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>(62)838-6625-3896</span>
            </div>
            <div className='contact-items'>
                <span className='contact-title'>Email</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>rajaabdullah@officer.com</span>
            </div>
        </div>
        {children}
    </aside>
)

export default RightDetail;