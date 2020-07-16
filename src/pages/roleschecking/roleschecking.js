import React from 'react';
import './roleschecking.css';
import { connect } from 'react-redux';

const RolesChecking = ({ currentUser, history }) => {

    setTimeout(() => {
        if (!currentUser) {
            history.push('/')
        }
        else {
            if (currentUser.isOfficer) {
                history.push('/officerhome')
            }
            else if (currentUser.isDistributor) {
                history.push('/distributorhome')
            }
            else if (currentUser.isAdmin) {
                history.push('/adminhome')
            }
        }

    }, 1000)


    return (
        <div className='roles-checking'>
            <div className="reverse-spinner"></div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(RolesChecking);