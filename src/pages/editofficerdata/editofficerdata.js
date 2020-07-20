import React from 'react';
import './editofficerdata.css';

import { connect } from 'react-redux';
import CustomButton from '../../component/custom-button/custom-button';
import CustomInput from '../../component/custom-input/custom-input';
import Footer from '../../component/footer/footer';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import HeaderBlank from '../../component/header-blank/header-blank';
import { firestore } from '../../firebase/firebase';


const EditOfficerData = ({ currentUser, history }) => {
    if (!currentUser) {
        history.push('/roleschecking')
    }

    const animatedComponents = makeAnimated();

    const [userData, setUserData] = React.useState({
        displayName: currentUser.displayName,
        email: currentUser.email,
        id: currentUser.id,
        noHp: currentUser.noHp,
        department: currentUser.department,
        address: currentUser.address,
        photoUrl: currentUser.photoUrl
    })

    const options = [
        { value: 'null', label: 'Silahkan pilih department' },
        { value: 'igd', label: 'IGD' },
        { value: 'icu', label: 'ICU' }
    ];

    const handleSelectChange = (data) => {
        console.log(data)
        setUserData({ ...userData, department: data.label })
    }

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const { photoUrl, displayName, email, noHp, id } = userData;
    const { address, department } = userData;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userRef = firestore.doc(`users/${id}`);

        try {
            await userRef.update({
                displayName: userData.displayName,
                email: userData.email,
                id: userData.id,
                noHp: userData.noHp,
                department: userData.department,
                address: userData.address,
                photoUrl: userData.photoUrl
            })
        } catch (e) {
            console.log(e)
        }

        history.push('/officerhome');
    }

    return (
        <div>
            <HeaderBlank withShadow />
            <div className='edit-officer-data'>
                <h1>Silahkan Lengkapi Data Terlebih Dahulu</h1>
                <form onSubmit={handleSubmit}>
                    <div className='info'>
                        <div className='user-image'>
                            <img src={photoUrl} alt='UserImage' />
                            <CustomButton value='Ganti' />
                        </div>
                        <div className='user-info'>
                            <h2>User Info</h2>
                            <CustomInput name='displayName' value={displayName} onChange={handleChange} />
                            <Select
                                name='name'
                                closeMenuOnSelect
                                components={animatedComponents}
                                defaultValue={options[0]}
                                options={options}
                                className='mb-1'
                                onChange={handleSelectChange}
                                value={options.filter(data => data.label === department)}
                            />

                            <h2>Contact Info</h2>
                            <CustomInput name='noHp' value={noHp ? noHp : ''} onChange={handleChange} />
                            <CustomInput name='email' value={email} readOnly onChange={handleChange} />
                            <textarea className='text-area' value={!address ? '' : address} name='address' rows='5' placeholder='Silahkan lengkapi alamat anda' onChange={handleChange} />
                            <CustomButton type='submit' color='dark' value='Update' />
                        </div>
                    </div>
                </form>
            </div>
            <Footer isAbsolute />
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(EditOfficerData);