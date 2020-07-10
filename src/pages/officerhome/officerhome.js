import React from 'react';
import './officerhome.css';
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import OfficerHomeIllustration from '../../assets/illustration/illustration-2.png';
import RequestButtonGroup from '../../component/request-button-group/request-button-group';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';

const OfficerHome = () => (
    <div>
        <HeaderOfficer />
        <div className='officerhome'>
            <section className='showcase'>
                <div className='showcase-text'>
                    <h1>Selamat Datang Petugas Medis</h1>
                    <p>Silahkan lakukan permintaan obat, kami akan sesegera mungkin menyiapkannya</p>
                </div>
                <img src={OfficerHomeIllustration} alt='OficerHomeIllustration' />
            </section>
            <RequestButtonGroup />
        </div>
        <FullscreenOverlay>

        </FullscreenOverlay>
        <Footer />
    </div>
)

export default OfficerHome;