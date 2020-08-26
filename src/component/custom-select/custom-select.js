import React from 'react';
import './custom-select.css';

const CustomSelect = ({ size }) => (
    <select className={`custom-select ${size}`}>
        <option value='null'>Silahkan Pilih</option>
    </select>
)

export default CustomSelect;