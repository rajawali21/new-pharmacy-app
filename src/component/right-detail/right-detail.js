import React from 'react';
import './right-detail.css';

import { connect } from 'react-redux';

const RightDetail = ({ children, image, active, selectedUser }) => (
    <aside className={`right-detail ${active && 'active'}`}>
        <div className={`side-header ${!selectedUser && 'none'}`}>
            <img src={selectedUser && selectedUser.photoUrl} alt='sideHeaderImg' />
            <div className='side-header-detail'>
                <h2>{selectedUser && selectedUser.displayName}</h2>
                <p>{selectedUser && selectedUser.department}</p>
                <span className='status online'><i className='fas fa-circle'></i> Available</span>
            </div>
        </div>

        <div className={`side-contact ${!selectedUser && 'none'}`}>
            <h3 className='contact-header'>Contact Information</h3>
            <div className='contact-items'>
                <span className='contact-title'>Mobile Phone :</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>{selectedUser && selectedUser.noHp}</span>
            </div>
            <div className='contact-items'>
                <span className='contact-title'>Email</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>{selectedUser && selectedUser.email}</span>
            </div>
            <div className='contact-items'>
                <span className='contact-title'>Alamat</span>
                <span className='contact-separator'>:</span>
                <span className='contact-value'>{selectedUser && selectedUser.address}</span>
            </div>
        </div>
    </aside>
)

const mapStateToProps = state => ({
    selectedUser: state.user.selectedUser
})

export default connect(mapStateToProps)(RightDetail);