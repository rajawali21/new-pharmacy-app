import React from 'react';
import './table-header.css'

const TableHeader = ({ items }) => {
    return (
        <div className='table-header'>
            {items.map(item =>
                (
                    <div className='table-header-item'>
                        <span>{item}</span>
                    </div>
                )
            )}

        </div>
    )
}

export default TableHeader;