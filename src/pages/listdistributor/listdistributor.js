import React from 'react';
import './listdistributor.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';

const ListDistributor = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='list-distributor'>
                <PageHeader title='Distributor' colorSchema='#F48A16' buttonColor='outline-orange' />
                <SectionSeparator />
                <CardGroup>
                    <CardUser buttonColor='outline-orange' />
                </CardGroup>
            </div>
            <Footer />
        </div>
    )
}

export default ListDistributor;