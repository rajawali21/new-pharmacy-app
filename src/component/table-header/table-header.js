import React from 'react';
import './table-header.css'

const TableHeader = ({ items }) => {
    return (
        <div className='table-header'>
            {items.map((item, index) =>
                (
                    <div className='table-header-item' key={index}>
                        <span>{item}</span>
                    </div>
                )
            )}

        </div>
    )
}

export default TableHeader;