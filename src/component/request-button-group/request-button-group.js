import React from 'react';
import './request-button-group.css';
import RequestButton from '../request-button/request-button';

const RequestButtonGroup = () => (
    <section className='request-button-group'>
        <RequestButton icon='fas fa-plus' value='Tambah Request' />
        <RequestButton icon='fas fa-spinner' value='Lihat Requestmu' />
    </section>
)

export default RequestButtonGroup;