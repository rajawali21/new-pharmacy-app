import React from 'react';
import './listrequest.css';

// Other Component
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
import HeaderAdmin from '../../component/header-admin/header-admin';
import { firestore } from '../../firebase/firebase';
import { addRequest, removeRequest } from '../../redux/request/request.action';
import CustomButton from '../../component/custom-button/custom-button';
import { addSelectedUser } from '../../redux/user/user.action';

const ListRequest = ({ toggleOverlay, toggleRightDetail, stateRightDefail, currentUser, history, addRequest, removeRequest, request, addSelectedUser, selectedUser }) => {

    if (!currentUser.isAdmin) {
        if (currentUser.isDistributor) {
            history.push('/distributorhome')
        }
        else if (currentUser.isOfficer) {
            history.push('/officerhome')
        }
    }

    React.useEffect(() => {
        async function getData() {
            const requestRef = firestore.collection('request');

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
    }, [addRequest, removeRequest])

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());

    }

    const [selectedRequest, setSelectedRequest] = React.useState()

    const handleRightDetail = (data) => {
        addSelectedUser(data.user);
        setSelectedRequest(data)
        toggleRightDetail();
    }


    return (
        <React.Fragment>
            <HeaderAdmin />
            <div className='list-request'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader onClick={() => toggleOverlay()} title='Request' onChange={handleSearch} noAddButton />
                    <SectionSeparator />
                    <TableHeader items={['No', 'Requestor', 'Tanggal', 'Jam', 'Status', 'Detail']} />
                    {request.filter(data => data.user.displayName.toLowerCase().includes(search.toLowerCase())).map((data, index) => {
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
            <Footer isAbsolute />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListRequest);