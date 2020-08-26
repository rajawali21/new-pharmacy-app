import React from 'react';
import './side-overlay-blank.css';

const SideOverlayBlank = ({ children, ...otherProps }) => (
    <form className='side-overlay-blank' {...otherProps}>
        {children}
    </form>
)

export default SideOverlayBlank;