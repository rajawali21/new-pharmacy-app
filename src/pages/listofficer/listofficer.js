import React from 'react';
import './listofficer.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import RegisterFormCard from '../../component/register-form-card/register-form-card';
import { connect } from 'react-redux';
import { addOfficer, addSelectedUser } from '../../redux/user/user.action';
import { toggleOverlay } from '../../redux/toggle/toggle.action';
import { firestore } from '../../firebase/firebase';
import { firestore2 } from '../../firebase/firebase-secondary';
import CustomButton from '../../component/custom-button/custom-button';
import CustomInput from '../../component/custom-input/custom-input';
import RightDetail from '../../component/right-detail/right-detail';

const ListOfficer = ({ addOfficer, officer, addSelectedUser, selectedUser, stateOverlay, toggleOverlay }) => {

    React.useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('users').where('isOfficer', '==', true);

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();

                changes.forEach(change => {
                    if (change.type === 'added') {
                        addOfficer({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addOfficer({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        // removeMedicine({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addOfficer])

    const [isEdit, setEdit] = React.useState(false);


    const [userData, setUserData] = React.useState({
        displayName: '',
        email: '',
        id: '',
        noHp: '',
        department: '',
        address: '',
        photoUrl: ''
    })

    const handleClick = (data) => {
        addSelectedUser(data)
    }

    const handleEdit = () => {
        setEdit(true);
        setUserData({
            displayName: selectedUser.displayName,
            email: selectedUser.email,
            id: selectedUser.id,
            noHp: selectedUser.noHp,
            department: selectedUser.department,
            address: selectedUser.address,
            photoUrl: selectedUser.photoUrl
        })
    }

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const userRef = firestore2.collection('users').doc(userData.id);

        try {
            await userRef.update({
                displayName: userData.displayName,
                noHp: userData.noHp,
                address: userData.address,
            })
        } catch (e) {
            console.error(e)
        }

        setEdit(false);
        addSelectedUser({
            displayName: userData.displayName,
            email: userData.email,
            id: userData.id,
            noHp: userData.noHp,
            department: userData.department,
            address: userData.address,
            photoUrl: userData.photoUrl
        })
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        const userRef = firestore2.collection('users').doc(userData.id);

        try {
            await userRef.delete();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <HeaderAdmin />
            <div className='right-left-container'>
                <div className='list-officer'>
                    <PageHeader title='Officer' buttonColor='outline-primary' onClick={() => toggleOverlay()}/>
                    <SectionSeparator />
                    <CardGroup>
                        {officer
                        .map((data, index) => <CardUser key={index} data={data} buttonColor='outline-success' onClick={() => handleClick(data)} userData={selectedUser} />)}
                    </CardGroup>
                </div>

                <RightDetail active>
                    <SideOverlayHeader />
                    <form className='input-area' onSubmit={handleSubmit}>
                        {selectedUser && <div className='button-group'>
                            <CustomButton
                                type='button'
                                value={isEdit ? 'Save' : 'Edit'}
                                onClick={isEdit ? handleSubmit : handleEdit}
                            />
                            <CustomButton
                                type='button'
                                value={isEdit ? 'Cancel' : 'Delete'}
                                color='red'
                                onClick={isEdit ? () => setEdit(false) : handleDelete}
                            />
                        </div>}


                        {isEdit && <div className='input-group'>
                            <CustomInput
                                name='displayName'
                                value={userData.displayName}
                                onChange={handleChange}
                                type='text'
                            />
                            <CustomInput
                                name='noHp'
                                value={userData.noHp}
                                onChange={handleChange}
                                type='text'
                            />
                            <textarea
                                name='address'
                                value={userData.address}
                                onChange={handleChange}
                                type='text'
                                rows='4'
                            />
                        </div>}


                    </form>
                </RightDetail>
            </div>
            <Footer />

            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Tambah Petugas'
                    text='Silahkan isi form di samping ini, untuk menambah admin'
                    footer='Pastikan isi form berikut dengan benar, agar tidak terjadi kesalah pahaman'
                    bgcolor='31CC70'
                    color='fff'
                />
                <SideOverlayBlank>
                    <SideOverlayHeader />
                    <RegisterFormCard isOfficer/>
                </SideOverlayBlank>
            </FullscreenOverlay>
        </div>
    )
}

const mapStateToProps = state => ({
    officer: state.user.officer,
    stateOverlay: state.toggle.toggleOverlay,
    selectedUser: state.user.selectedUser
})

const mapDispatchToProps = dispatch => ({
    addOfficer: officer => dispatch(addOfficer(officer)),
    toggleOverlay: () => dispatch(toggleOverlay()),
    addSelectedUser: (user) => dispatch(addSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListOfficer);