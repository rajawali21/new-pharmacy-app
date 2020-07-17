import React from 'react';
import './listdistribution.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';

const ListDistribution = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='list-distribution'>
                <PageHeader title='Distribution' colorSchema='#F48A16' noAddButton />
                <SectionSeparator />
                <TableHeader items={['No', 'Requestor', 'Obat', 'Jumlah', 'Tanggal Distribusi', 'Tanggal Diterima', 'Status']} />
            </div>
        </div>
    )
}

export default ListDistribution;