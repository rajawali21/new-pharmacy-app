import React from 'react';
import './right-detail.css';

import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button';
import { toggleRightDetail } from '../../redux/toggle/toggle.action';


const RightDetail = ({ children, active, selectedUser, bigger, withButton, handleClick, title, toggleRightDetail, noPaddingTop, withPrint, handlePrint }) => (
    <aside className={`right-detail ${active && 'active'} ${bigger && 'bigger'} ${noPaddingTop && 'paddingless'}`}>
        <h1 style={{ textAlign: 'center', color: '#A5A3A8', marginBottom: '3rem' }}>{title}</h1>
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

        {children}

        {withButton &&
            <div className='other-props'>
                {withPrint &&
                    <CustomButton color='blue' value='Print' style={{ width: "20%" }} onClick={handlePrint} />
                }

                <CustomButton color='blue' value={withButton} style={{ width: "20%" }} onClick={handleClick} />
            </div>
        }


        <span className='close' onClick={() => toggleRightDetail()}>&#10005;</span>

    </aside>
)


const mapStateToProps = state => ({
    selectedUser: state.user.selectedUser
})

const mapDispatchToPrps = dispatch => ({
    toggleRightDetail: (data) => dispatch(toggleRightDetail(data)),

})

export default connect(mapStateToProps, mapDispatchToPrps)(RightDetail);