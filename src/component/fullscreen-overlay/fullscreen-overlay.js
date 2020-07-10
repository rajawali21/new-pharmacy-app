import React from 'react';
import './fullscreen-overlay.css';

const FullscreenOverlay = ({ children }) => (
    <div className='fullscreen-overlay'>
        {children}
    </div>
)

export default FullscreenOverlay;