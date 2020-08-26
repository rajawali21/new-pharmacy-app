import React from 'react';
import './listrequest.css';

// Other Component
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';
import TableData from '../../component/table-data/table-data';
import { useSnackbar } from 'notistack';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay, toggleRightDetail } from '../../redux/toggle/toggle.action';
import { addSelectedUser } from '../../redux/user/user.action';
import RightDetail from '../../component/right-detail/right-detail';
import HeaderAdmin from '../../component/header-admin/header-admin';
import firebase, { firestore } from '../../firebase/firebase';
import { addRequest, removeRequest } from '../../redux/request/request.action';
import CustomButton from '../../component/custom-button/custom-button';
import CustomInput from '../../component/custom-input/custom-input';

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
    const { enqueueSnackbar } = useSnackbar();

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());

    }

    const [selectedRequest, setSelectedRequest] = React.useState({ items: [] })

    const handleRightDetail = (data) => {
        addSelectedUser(data.user);
        setSelectedRequest(data)
        toggleRightDetail(true);

        const newData = [...data.items];
        data.items.map((data, index) => {
            newData[index] = { ...data, approvedValue: data.approved };
            return setSelectedRequest(request => ({
                ...request,
                items: newData
            }));

        })

    }

    const handleApprove = async () => {
        try {
            const requestRef = firestore.collection('request').doc(selectedRequest.id);
            selectedRequest.items.map(async data => {
                console.log(data.approved)
                const departmentRef = firestore.collection('department').doc(selectedUser.department);
                const stockRef = firestore.collection('department').doc(selectedUser.department).collection('stock').doc(data.id);
                const medicineRef = firestore.collection('medicine').doc(data.id);
                try {
                    await departmentRef.set({
                        name: selectedUser.department,
                    }, { merge: true });
                } catch (e) {
                    alert(e.message)
                }

                try {
                    await stockRef.set({
                        name: data.obat,
                        jumlah: firebase.firestore.FieldValue.increment(parseInt(data.approved))
                    }, { merge: true });
                } catch (e) {
                    alert(e.message)
                }

                try {
                    await medicineRef.set({
                        quantity: firebase.firestore.FieldValue.increment(parseInt(-data.approved))
                    }, { merge: true });
                } catch (e) {
                    alert(e.message)
                }

            })

            await requestRef.update({
                items: selectedRequest.items,
                isApproved: true,
                status: '2'
            })

            setSelectedRequest({
                ...selectedRequest,
                isApproved: true,
                status: '2'
            })

            enqueueSnackbar('Data request telah diapprove', { variant: 'success' });
        } catch (e) {
            alert(e.message)
        }
    }

    const handleUpdate = async () => {
        try {
            selectedRequest.items.map(async data => {
                const stockRef = firestore.collection('department').doc(selectedUser.department).collection('stock').doc(data.id);
                const medicineRef = firestore.collection('medicine').doc(data.id);
                const stockValue = parseInt(data.approved) - parseInt(data.approvedValue);
                const medicineValue = parseInt(data.approvedValue) - parseInt(data.approved);
                console.log(stockValue, medicineValue)
                try {
                    await stockRef.set({
                        name: data.obat,
                        jumlah: firebase.firestore.FieldValue.increment(parseInt(stockValue))
                    }, { merge: true });
                } catch (e) {
                    alert(e.message)
                }

                try {
                    await medicineRef.set({
                        quantity: firebase.firestore.FieldValue.increment(parseInt(medicineValue))
                    }, { merge: true });
                } catch (e) {
                    alert(e.message)
                }

            })

            const requestRef = firestore.collection('request').doc(selectedRequest.id);
            const items = [...selectedRequest.items];
            selectedRequest.items.map((data, index) => {
                items[index] = { id: data.id, approved: data.approved, jumlah: data.jumlah, obat: data.obat, max: data.max };
                return setSelectedRequest(request => ({
                    ...request,
                    items: items
                }));

            })
            await requestRef.update({
                items: selectedRequest.items,
                isApproved: true
            })

            setSelectedRequest({
                ...selectedRequest,
                isApproved: true
            })

            enqueueSnackbar('Data request telah diupdate', { variant: 'success' });
        } catch (e) {
            alert(e.message)
        }
    }

    const handleChange = (e) => {
        const items = [...selectedRequest.items];
        if (parseInt(e.target.value) > parseInt(items[e.target.name].jumlah)) {
            e.target.value = items[e.target.name].jumlah
        }
        items[e.target.name]['approved'] = parseInt(e.target.value);
        setSelectedRequest(request => ({
            ...request,
            items
        }));
    }


    const { isApproved } = selectedRequest;



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
                        const hour = dateData.slice(16, 25);
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
                    <RightDetail active={stateRightDefail} bigger withButton={isApproved ? 'Update' : 'Approve'} handleClick={isApproved ? handleUpdate : handleApprove}>
                        <TableHeader items={['No', 'Obat', 'Jumlah Request', 'Approved']} />
                        {selectedRequest.items.map((data, index) => (
                            <TableData key={index}>
                                <React.Fragment>
                                    <div style={{ width: '5%' }} className='table-data-item'>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div style={{ width: '45%' }} className='table-data-item'>
                                        <span>{data.obat}</span>
                                    </div>
                                    <div style={{ width: '15%' }} className='table-data-item'>
                                        <span>{data.jumlah}</span>
                                    </div>
                                    <div style={{ width: '15%' }} className='table-data-item'>
                                        <CustomInput type='number' name={index} onChange={handleChange} value={data.approved ? data.approved : ''} />
                                    </div>
                                </React.Fragment>
                            </TableData>
                        ))}
                    </RightDetail>
                }
            </div>
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
    toggleRightDetail: (data) => dispatch(toggleRightDetail(data)),
    addRequest: request => dispatch(addRequest(request)),
    removeRequest: request => dispatch(removeRequest(request)),
    addSelectedUser: user => dispatch(addSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListRequest);