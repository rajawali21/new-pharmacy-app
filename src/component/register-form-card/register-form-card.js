import React from 'react';
import './register-form-card.css';
import { auth, createOfficer } from '../../firebase/firebase';
import { auth2, createDistributor2, createAdmin2 } from '../../firebase/firebase-secondary';

// Oher Component

const RegisterFormCard = ({ isOfficer, isAdmin, isDistributor }) => {

    const [form, setForm] = React.useState({
        displayName: '',
        email: '',
        noHp: '',
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

        const { displayName, email, password, confirmPassword, photoUrl, noHp } = form;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak sama');
            return;
        }

        try {

            if (isOfficer) {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await createOfficer(user, { displayName, noHp, photoUrl });
            }
            else if (isDistributor) {
                const { user } = await auth2.createUserWithEmailAndPassword(email, password);
                await createDistributor2(user, { displayName, noHp, photoUrl });
                auth2.signOut();
            }
            else if (isAdmin) {
                const { user } = await auth2.createUserWithEmailAndPassword(email, password);
                await createAdmin2(user, { displayName, noHp, photoUrl });
                auth2.signOut();
            }
            setForm({ ...form, displayName: '', email: '', password: '', confirmPassword: '', noHp: '' })

        }
        catch (error) {
            console.error(error);
        }
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
                    type='text'
                    name='noHp'
                    className='input-100'
                    placeholder='Silahkan masukan no handphone anda'
                    value={form.noHp}
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

                <div className='button-group' style={{marginTop: "30px"}}>
                    <button type='submit' className='button-primary' value='Register'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterFormCard;