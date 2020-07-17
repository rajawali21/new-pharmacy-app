import React from 'react';
import './page-header.css';

// Other Component
import CustomButton from '../../component/custom-button/custom-button';

const PageHeader = ({ title, onClick, colorSchema, noAddButton, buttonColor }) => {
    return (
        <div className='page-header'>
            <div className='page-title'>
                <p className='title'>Home {' > '} {title}</p>
                <div className={`line ${noAddButton && 'full'}`} />

                {!noAddButton
                    ? <CustomButton color={buttonColor} value={`Add ${title}`} onClick={onClick} /> : <div style={{ padding: '2rem 0' }} />
                }
            </div>
            <div className='page-heading'>
                <h1>{title} Directory</h1>
            </div>
            <div className='page-filter'>
                <form>
                    <input className='filter-input' type='text' name={`cari${title}`} placeholder={`Search ${title} ...`} />
                    <button type='button' className='button-icon' style={{ backgroundColor: colorSchema, border: `1px solid ${colorSchema}` }}><i className='fas fa-search'></i> Filter</button>
                </form>
            </div>
        </div>
    )
}

export default PageHeader;