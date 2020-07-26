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

// Redux
import { connect } from 'react-redux';
import { toggleOverlay, toggleRightDetail } from '../../redux/toggle/toggle.action';

import RightDetail from '../../component/right-detail/right-detail';
import { firestore } from '../../firebase/firebase';
import { addRequest, removeRequest } from '../../redux/request/request.action';
import CustomButton from '../../component/custom-button/custom-button';
import { addSelectedUser } from '../../redux/user/user.action';

const OfficerRequest = ({ toggleOverlay, toggleRightDetail, stateRightDefail, currentUser, history, addRequest, request, removeRequest, addSelectedUser, selectedUser }) => {

    if (!currentUser.isOfficer) {
        if (currentUser.isDistributor) {
            history.push('/homedistributor')
        }
        else if (currentUser.isAdmin) {
            history.push('/homeadmin')
        }
    }

    React.useEffect(() => {
        async function getData() {
            const requestRef = firestore.collection('request').where('user.id', '==', currentUser.id);

            requestRef.onSnapshot(snap => {
                const changes = snap.docChanges();
                changes.forEach(change => {
                    if (change.type === 'added') {
                        addRequest({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addRequest({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        removeRequest({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addRequest, currentUser.id, removeRequest])

    const [selectedRequest, setSelectedRequest] = React.useState()

    const handleRightDetail = (data) => {
        addSelectedUser(data.user);
        setSelectedRequest(data)
        toggleRightDetail();
    }


    return (
        <React.Fragment>
            <HeaderOfficer />
            <div className='officer-request'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader onClick={() => toggleOverlay()} title='Request' />
                    <SectionSeparator />
                    <TableHeader items={['No', 'Requestor', 'Tanggal', 'Jam', 'Status', 'Detail']} />
                    {request.map((data, index) => {
                        const dateData = new Date(data.tanggalRequest.seconds * 1000).toString().replace('GMT+0700 (Western Indonesia Time)', '');
                        const date = dateData.slice(4, 15);
                        const hour = dateData.replace('Sun Jul 26 2020 ', '')
                        return (
                            <TableData key={index}>
                                <React.Fragment>
                                    <div className='table-data-item'>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{data.user.displayName}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{date}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{hour}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{data.status === '1' ? 'On Process' : 'Completed'}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <CustomButton value='Detail' onClick={() => handleRightDetail(data)} />
                                    </div>
                                </React.Fragment>
                            </TableData>
                        )
                    })}
                </div>
                {selectedUser &&
                    <RightDetail active={stateRightDefail}>
                        <TableHeader items={['No', 'Obat', 'Jumlah', 'Approved']} />
                        {selectedRequest.items.map((data, index) => (
                            <TableData>
                                <React.Fragment>
                                    <div style={{ width: '5%' }} className='table-data-item'>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{data.obat}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{data.jumlah}</span>
                                    </div>
                                    <div className='table-data-item'>
                                        <span>{data.aproved}</span>
                                    </div>
                                </React.Fragment>
                            </TableData>
                        ))}

                    </RightDetail>
                }
            </div>
            <RequestOverlay />
            <Footer />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    stateRightDefail: state.toggle.toggleRightDetail,
    currentUser: state.user.currentUser,
    request: state.request.request,
    selectedUser: state.user.selectedUser
})

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay()),
    toggleRightDetail: () => dispatch(toggleRightDetail()),
    addRequest: request => dispatch(addRequest(request)),
    removeRequest: request => dispatch(removeRequest(request)),
    addSelectedUser: user => dispatch(addSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(OfficerRequest);