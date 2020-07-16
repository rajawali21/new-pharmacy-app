import React from 'react';
import { Link } from 'react-router-dom';
import './login-form-card.css';

// Oher Component
import GoogleButton from '../../component/google-button/google-button';
import FacebookButton from '../../component/facebook-button/facebook-button';
import { SignInWithGoogle } from '../../firebase/firebase';

const LoginFormCard = () => (
    <div className='login-form-card'>
        <div className='login-form-header'>
            <h2>Form Login</h2>
            <p>Silahkan masukan email dan password</p>
        </div>
        <form className='login-form-body'>
            <input type='email' className='input-100' placeholder='Silahkan masukan email anda' />
            <input type='password' className='input-100' placeholder='Silahkan masukan password anda' />
            <div className='button-group'>
                <p className='text-primary'>Lupa sandi?</p>
                <button type='submit' className='button-primary'>Login</button>
            </div>
            <GoogleButton onClick={SignInWithGoogle} />
            <FacebookButton />
        </form>
        <div className='login-form-footer'>
            <p>Belum punya akun? <Link to='/register' className='text-primary'> Daftar Disini! </Link></p>
        </div>
    </div>
)

export default LoginFormCard;