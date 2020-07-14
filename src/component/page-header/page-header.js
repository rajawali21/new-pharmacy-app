import React from 'react';
import './page-header.css';

// Other Component
import CustomButton from '../../component/custom-button/custom-button';

const PageHeader = ({ title, handleClick }) => {
    return (
        <div className='page-header'>
            <div className='page-title'>
                <p className='title'>Home {' > '} Request</p>
                <div className='line' />
                <CustomButton color='outline-primary' value='Tambah Request' onClick={handleClick} />
            </div>
            <div className='page-heading'>
                <h1>Request Directory</h1>
            </div>
            <div className='page-filter'>
                <form>
                    <input className='filter-input' type='text' name='cariRequest' placeholder='Cari Request ...' />
                    <button className='button-icon'><i className='fas fa-search'></i> Filter</button>
                </form>
            </div>
        </div>
    )
}

export default PageHeader;