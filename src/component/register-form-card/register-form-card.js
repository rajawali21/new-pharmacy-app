import React from 'react';
import { Link } from 'react-router-dom';
import './register-form-card.css';

// Oher Component

const RegisterFormCard = () => (
    <div className='register-form-card'>
        <div className='register-form-header'>
            <h2>Form Registrasi</h2>
            <p>Silahkan lengkapi formulir dibawah ini</p>
        </div>
        <form className='register-form-body'>
            <input type='text' className='input-100' placeholder='Silahkan masukan nama anda' />
            <input type='email' className='input-100' placeholder='Silahkan masukan email anda' />
            <input type='password' className='input-100' placeholder='Silahkan masukan password anda' />
            <input type='password' className='input-100' placeholder='Silahkan konfirmasi password anda' />
            <div className='button-group'>
                <button type='submit' className='button-primary'>Register</button>
            </div>
        </form>
        <div className='register-form-footer'>
            <p>Sudah punya akun? <Link to='/' className='text-primary'> Login Disini! </Link></p>
        </div>
    </div>
)

export default RegisterFormCard;