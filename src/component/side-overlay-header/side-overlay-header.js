import React from 'react';
import './side-overlay-header.css';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/toggle/toggle.action';

const SideOverlayHeader = ({ toggleOverlay }) => (
    <div className='side-overlay-header'>
        <span onClick={() => toggleOverlay()}>&#10005;</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default connect(null, mapDispatchToProps)(SideOverlayHeader);