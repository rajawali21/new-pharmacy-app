import React from 'react';
import './officerrequest.css';

// Other Component
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';
import RequestOverlay from '../../component/request-overlay/request-overlay';
import TableData from '../../component/table-data/table-data';
import SampleImage from '../../assets/sample/officer-1.jpg';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay, toggleRightDetail } from '../../redux/toggle/toggle.action';
import RightDetail from '../../component/right-detail/right-detail';

const OfficerRequest = ({ toggleOverlay, toggleRightDetail, stateRightDefail, currentUser, history }) => {

    if (!currentUser.isOfficer) {
        if (currentUser.isDistributor) {
            history.push('/homedistributor')
        }
        else if (currentUser.isAdmin) {
            history.push('/homeadmin')
        }
    }

    return (
        <React.Fragment>
            <HeaderOfficer />
            <div className='officer-request'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader onClick={() => toggleOverlay()} title='Request' />
                    <SectionSeparator />
                    <TableHeader items={['No', 'Requestor', 'Tanggal', 'Jam', 'Status', 'Detail']} />
                    <TableData onClick={() => toggleRightDetail()} incDetail />
                </div>
                <RightDetail image={SampleImage} active={stateRightDefail}>
                    <TableHeader items={['No', 'Obat', 'Jumlah']} />
                    <TableData />
                </RightDetail>
            </div>
            <RequestOverlay />
            <Footer isAbsolute />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    stateRightDefail: state.toggle.toggleRightDetail,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay()),
    toggleRightDetail: () => dispatch(toggleRightDetail())
})

export default connect(mapStateToProps, mapDispatchToProps)(OfficerRequest);