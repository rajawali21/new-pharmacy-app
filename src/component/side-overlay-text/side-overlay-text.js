import React from 'react';
import './side-overlay-text.css';

const SideOverlayText = ({ header, text, footer, bgcolor, color, children }) => (
    <div className='side-overlay-text' style={{ backgroundColor: `#${bgcolor}`, color: `#${color}` }}>
        <h1 className='text-3x'>{header}</h1>
        <p className='text-15x'>{text}</p>

        <footer>{footer}</footer>
        {children}
    </div>
)

export default SideOverlayText;