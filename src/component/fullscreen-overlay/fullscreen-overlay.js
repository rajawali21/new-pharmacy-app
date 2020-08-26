import React from 'react';
import './fullscreen-overlay.css';

const FullscreenOverlay = ({ children, active }) => (
    <div className={`fullscreen-overlay ${active && 'active'}`}>
        {children}
    </div>
)

export default FullscreenOverlay;