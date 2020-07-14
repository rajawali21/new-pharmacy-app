import React from 'react';
import './table-data.css';
import CustomButton from '../custom-button/custom-button';

const TableData = ({ data, onClick, incDetail }) => (
    <div className='table-data'>
        <div className='table-data-item'>
            <span>1</span>
        </div>
        <div className='table-data-item'>
            <span>1</span>
        </div>
        <div className='table-data-item'>
            <span>1</span>
        </div>
        <div className='table-data-item'>
            <span>1</span>
        </div>
        <div className='table-data-item'>
            <span>1</span>
        </div>

        {incDetail && <div className='table-data-item'>
            <CustomButton value='Detail' onClick={onClick} />
        </div>}


    </div>
)

export default TableData;