import React, { useState } from 'react';
import './usersetting.css';

// Other Library
import { connect } from 'react-redux';
import HeaderOfficer from '../../component/header-oficer/header-officer';
import HeaderDistributor from '../../component/header-distributor/header-distributor';
import CustomInput from '../../component/custom-input/custom-input';
import Footer from '../../component/footer/footer';
import CustomButton from '../../component/custom-button/custom-button';

const UserSetting = ({ currentUser, history }) => {

    if (!currentUser) {
        history.push('/roleschecking')
    }

    const [resetPassword, setResetPassword] = useState(false)

    const handleReset = () => {
        setResetPassword(!resetPassword);
    }

    const { isOfficer, isDistributor, isAdmin, photoUrl, displayName, email } = currentUser;

    return (
        <div>
            {isOfficer && <HeaderOfficer />}
            {isDistributor && <HeaderDistributor />}
            {isAdmin && <HeaderDistributor />}
            <div className='user-setting'>
                <div className='user-image'>
                    <img src={photoUrl} alt='UserImage' />
                    <CustomButton value='Ganti' />
                </div>
                <div className='user-info'>
                    <h2>User Info</h2>
                    <CustomInput value={displayName} />
                    <CustomInput value={email} readOnly />

                    <h2>Contact Info</h2>
                    <CustomInput value={displayName} />
                    <CustomInput value={email} readOnly />

                    {resetPassword &&
                        <div>
                            <h2>Reset Password</h2>
                            <CustomInput value={displayName} />
                            <CustomInput value={email} readOnly />
                        </div>
                    }


                    <CustomButton value={!resetPassword ? 'Reset Password' : 'Cancel'} color='dark' onClick={handleReset} />
                </div>
            </div>
            <Footer isAbsolute />
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserSetting); 