import React from 'react';
import './listadmin.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';

const ListAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='list-admin'>
                <PageHeader title='Admin' colorSchema='#2ecc71' />
                <SectionSeparator />
                <CardGroup>
                    <h1>This is Card Group</h1>
                </CardGroup>
            </div>
            <Footer />
        </div>
    )
}

export default ListAdmin;