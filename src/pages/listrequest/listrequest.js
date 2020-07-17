import React from 'react';
import './listrequest.css';

// Other Component
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
import HeaderAdmin from '../../component/header-admin/header-admin';

const ListRequest = ({ toggleOverlay, toggleRightDetail, stateRightDefail, currentUser, history }) => {

    if (!currentUser.isAdmin) {
        if (currentUser.isDistributor) {
            history.push('/distributorhome')
        }
        else if (currentUser.isOfficer) {
            history.push('/officerhome')
        }
    }

    return (
        <React.Fragment>
            <HeaderAdmin />
            <div className='list-request'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader onClick={() => toggleOverlay()} title='Request' noAddButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListRequest);