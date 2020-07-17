import React from 'react';
import { Link } from 'react-router-dom';
import './register-form-card.css';
import { auth, createOfficer } from '../../firebase/firebase';

// Oher Component

const RegisterFormCard = () => {

    const [form, setForm] = React.useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/pharmacy-db-c9def.appspot.com/o/user.png?alt=media&token=86125a0a-c596-458e-a74b-5b6ded205658'
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword, photoUrl } = form;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak sama');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createOfficer(user, { displayName, photoUrl });
            setForm({ ...form, displayName: '', email: '', password: '', confirmPassword: '' })

        }
        catch (error) {
            console.error(error);
        }
        // event.preventDefault();
        // const { displayName, email, password, confirmPassword, photoUrl } = form;

        // console.log(displayName, photoUrl)

        // if (password !== confirmPassword) {
        //     alert('Password dan Konfirmasi Password Tidak sesuai');
        //     return;
        // }

        // try {
        //     const { user } = auth.createUserWithEmailAndPassword(email, password);

        //     await createOfficer(user, { displayName });
        //     setForm({ ...form, displayName: '', email: '', password: '', confirmPassword: '' })
        // } catch (e) {
        //     console.error(e)
        // }

    }

    return (
        <div className='register-form-card'>
            <div className='register-form-header'>
                <h2>Form Registrasi</h2>
                <p>Silahkan lengkapi formulir dibawah ini</p>
            </div>
            <form className='register-form-body' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='displayName'
                    className='input-100'
                    placeholder='Silahkan masukan nama anda'
                    value={form.displayName}
                    onChange={handleChange}
                />

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

                <input
                    type='password'
                    name='confirmPassword'
                    className='input-100'
                    placeholder='Silahkan konfirmasi password anda'
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                <div className='button-group'>
                    <button type='submit' className='button-primary' value='Register'>Register</button>
                </div>
            </form>
            <div className='register-form-footer'>
                <p>Sudah punya akun? <Link to='/' className='text-primary'> Login Disini! </Link></p>
            </div>
        </div>
    )
}

export default RegisterFormCard;