import React from 'react';
import './officerhome.css';

// Other Library
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/toggle/toggle.action';
import { withRouter } from 'react-router-dom';

// Other Components
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import OfficerHomeIllustration from '../../assets/illustration/illustration-2.png';
import RequestButtonGroup from '../../component/request-button-group/request-button-group';
import RequestButton from '../../component/request-button/request-button';
import RequestOverlay from '../../component/request-overlay/request-overlay';
import Showcase from '../../component/showcase/showcase';

const OfficerHome = ({ toggleOverlay, history }) => {

    return (
        <div>
            <HeaderOfficer />
            <div className='officerhome'>
                <Showcase
                    image={OfficerHomeIllustration}
                    title='Selamat Datang Petugas Medis'
                    text='Silahkan lakukan permintaan obat, kami akan sesegera mungkin menyiapkannya'
                />
                <RequestButtonGroup>
                    <RequestButton icon='fas fa-plus' value='Tambah Request' onClick={() => toggleOverlay()} />
                    <RequestButton icon='fas fa-spinner' value='Lihat Requestmu' onClick={() => history.push('/officerrequest')} />
                </RequestButtonGroup>
            </div>
            <RequestOverlay />
            <Footer />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default withRouter(connect(null, mapDispatchToProps)(OfficerHome));