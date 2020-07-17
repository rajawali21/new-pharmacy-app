import React from 'react';
import './distribution.css';
import HeaderDistributor from '../../component/header-distributor/header-distributor';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';

const Distribution = () => {
    return (
        <div>
            <HeaderDistributor />
            <div className='distribution'>
                <PageHeader title='Distribution' colorSchema='#F48A16' noAddButton />
                <SectionSeparator />
                <TableHeader items={['No', 'Requestor', 'Obat', 'Jumlah', 'Tanggal Distribusi', 'Tanggal Diterima', 'Status']} />
            </div>
        </div>
    )
}

export default Distribution;