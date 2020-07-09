import React from 'react';
import './officerhome.css';
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import OfficerHomeIllustration from '../../assets/illustration/illustration-2.png';

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
            <section className='menu'></section>
        </div>
        <Footer />
    </div>
)

export default OfficerHome;