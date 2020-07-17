import React from 'react';
import './listofficer.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';

const ListOfficer = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='list-officer'>
                <PageHeader title='Officer' buttonColor='outline-primary' />
                <SectionSeparator />
                <CardGroup>
                    <CardUser buttonColor='outline-primary' />
                </CardGroup>
            </div>
            <Footer />
        </div>
    )
}

export default ListOfficer;