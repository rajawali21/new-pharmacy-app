import React from 'react';
import './table-header.css'

const TableHeaderRequest = ({ items }) => {
    return (
        <div className='table-header'>
            <div style={{ width: '5%' }} className='table-header-item'>
                <span>No</span>
            </div>
            <div style={{ width: '45%' }} className='table-header-item'>
                <span>Obat</span>
            </div>
            <div style={{ width: '15%' }} className='table-header-item'>
                <span>Jumlah</span>
            </div>
            <div style={{ width: '15%' }} className='table-header-item'>
                <span>Approved</span>
            </div>

        </div>
    )
}

export default TableHeaderRequest;