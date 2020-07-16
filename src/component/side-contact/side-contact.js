import React from 'react';
import './side-contact.css';

const SideContact = () => (
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
)

export default SideContact;