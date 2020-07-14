import React from 'react';
import './officerrequest.css';

import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';
import RequestOverlay from '../../component/request-overlay/request-overlay';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/toggle/toggle.action';
import TableData from '../../component/table-data/table-data';

const OfficerRequest = ({ toggleOverlay }) => {
    return (
        <React.Fragment>
            <HeaderOfficer />
            <div className='officer-request'>
                <div className='left-side'>
                    <PageHeader handleClick={() => toggleOverlay()} />
                    <SectionSeparator />
                    <TableHeader items={['No', 'Requestor', 'Tanggal', 'Jam', 'Status', 'Detail']} />
                    <TableData />
                </div>
                <aside className='right-side'></aside>
            </div>
            <RequestOverlay />
            <Footer isAbsolute />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default connect(null, mapDispatchToProps)(OfficerRequest);