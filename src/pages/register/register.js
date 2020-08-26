import React from 'react';
import './register.css';

// Other Component
import HeaderBlank from '../../component/header-blank/header-blank';
import LoginImage from '../../assets/illustration/illustration-1.png';
import RegisterFormCard from '../../component/register-form-card/register-form-card';
import Footer from '../../component/footer/footer';



const Register = () => {

    return (
        <div>
            <HeaderBlank />
            <main className='login'>
                <div className='left-side'>
                    <h1>Selamat Datang Di Aplikasi Farmasi</h1>
                    <p>Silahkan lakukan permintaan obat disini, kami akan melayani anda dengan sepenuh hati </p>
                    <img src={LoginImage} alt='LoginImage' className='login-image' />
                </div>
                <div className='right-side'>
                    <RegisterFormCard isOfficer />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Register;