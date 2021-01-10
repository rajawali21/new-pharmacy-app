import React from 'react';
import { Link } from 'react-router-dom';
import './login-form-card.css';

// Oher Component
import { auth } from '../../firebase/firebase';

const LoginFormCard = () => {

    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = form;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setForm({ email: '', password: '' })
        } catch (e) {
            alert(e.message)
        }

    }


    return (
        <div className='login-form-card'>
            <div className='login-form-header'>
                <h2>Form Login</h2>
                <p>Silahkan masukan email dan password</p>
            </div>
            <form className='login-form-body' onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    className='input-100'
                    placeholder='Silahkan masukan email anda'
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type='password'
                    name='password'
                    className='input-100'
                    placeholder='Silahkan masukan password anda'
                    value={form.password}
                    onChange={handleChange}
                />

                <div className='button-group'>
                    <p className='text-primary'>Lupa sandi?</p>
                    <button type='submit' className='button-primary'>Login</button>
                </div>
            </form>
            <div className='login-form-footer'>
                <p>Belum punya akun? <Link to='/register' className='text-primary'> Daftar Disini! </Link></p>
            </div>
        </div>
    )
}

export default LoginFormCard;