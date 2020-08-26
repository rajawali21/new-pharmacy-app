import React, { useEffect, useState } from 'react';
import './listdistribution.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import TableHeader from '../../component/table-header/table-header';
import RightDetail from '../../component/right-detail/right-detail';
import { connect } from 'react-redux';
import { toggleRightDetail, toggleOverlay } from '../../redux/toggle/toggle.action';
import TableData from '../../component/table-data/table-data';
import CustomButton from '../../component/custom-button/custom-button';
import Footer from '../../component/footer/footer';
import makeAnimated from 'react-select/animated';
import { addSelectedUser } from '../../redux/user/user.action';

import { addDistribution, removeDistribution, selectDistribution } from '../../redux/distribution/distribution.action';
import { addMedicine } from '../../redux/medicine/medicine.action';
import { firestore } from '../../firebase/firebase';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import Select from 'react-select';
import FormContainerScrollable from '../../component/form-container-scrollable/form-container-scrollable';
import CustomInput from '../../component/custom-input/custom-input';


const ListDistribution = ({ stateRightDefail, toggleRightDetail, selectDistribution, addDistribution, removeDistribution, stateOverlay, toggleOverlay, distribution, addMedicine, currentUser, addSelectedUser }) => {


    const [listMedicine, setListMedicine] = useState([])

    const [request, setRequest] = useState({
        items: [],
        isDone: false,
        user: {
            id: currentUser.id,
            displayName: currentUser.displayName,
            photoUrl: currentUser.photoUrl,
            address: currentUser.address,
            noHp: currentUser.noHp,
            email: currentUser.email,
            department: currentUser.department
        }
    })

    useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('distribution');

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();
                console.log(changes);
                changes.forEach(change => {
                    console.log(change.doc.id)
                    if (change.type === 'added') {
                        addDistribution({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addDistribution({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        removeDistribution({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })

            const medicineRef = firestore.collection('medicine');
            const medicines = [];
            medicineRef.onSnapshot(async snap => {
                const changes = snap.docChanges();
                changes.forEach(change => {
                    medicines.push({ id: change.doc.id, value: change.doc.data().name, label: change.doc.data().name, quantity: change.doc.data().quantity })
                })
                setListMedicine(medicines.filter(data => data.quantity !== 0))
            })
        }

        getData();
    }, [addMedicine, addDistribution, removeDistribution])

    const [search, setSearch] = React.useState('');

    const handleSelectChange = (data, property) => {
        console.log(data, property);
        let item = [...request.items];
        setRequest({ ...request, items: [...item, { id: data.id, obat: data.label, jumlah: '' }] })
    }


    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());
    }

    const options = listMedicine;
    const animatedComponents = makeAnimated();

    const handleChange = (e) => {
        let items = [...request.items];
        items[e.target.dataset.id]['jumlah'] = parseInt(e.target.value)
        setRequest({ ...request, items })
    }

    const handleRemove = (index) => {
        let items = [...request.items];
        items.splice(index, 1)

        setRequest({ ...request, items })
    }

    const handleSubmit = async () => {
        try {
            const distRef = firestore.collection('distribution');
            const tanggalRequest = new Date();
            await distRef.add({
                ...request,
                tanggalRequest: tanggalRequest,
                tanggalSelesai: null,
                status: '1'
            });
            setRequest({
                items: [],
                isDone: false,
                tanggalRequest: tanggalRequest,
                tanggalSelesai: null,
                status: '1',
                user: {
                    id: currentUser.id,
                    displayName: currentUser.displayName,
                    photoUrl: currentUser.photoUrl,
                    address: currentUser.address,
                    noHp: currentUser.noHp,
                    email: currentUser.email,
                    department: currentUser.department
                }
            })
            toggleOverlay(false);
        } catch (e) {
            alert(e.message);
        }
    }

    const [selectedRequest, setSelectedRequest] = useState({ items: [] })

    const handleDetail = (data) => {
        addSelectedUser(data.user);
        setSelectedRequest(data);
        toggleRightDetail(true);
    }

    return (
        <div>
            <HeaderAdmin />
            <div className='list-distribution'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader title='Distribution' colorSchema='#F48A16' buttonColor='outline-orange' onChange={handleSearch} onClick={() => toggleOverlay()} />
                    <SectionSeparator />
                    <TableHeader items={['No', 'Requestor', 'Tanggal Permintaan', 'Tanggal Diterima', 'Status', 'Action']} />
                    {distribution.filter(data => data.user.displayName.toLowerCase().includes(search)).map((data, index) => {
                        const dateData = new Date(data.tanggalRequest.seconds * 1000).toString().replace('GMT+0700 (Western Indonesia Time)', '');
                        const date = dateData.slice(4, 15);
                        // const hour = dateData.slice(16, 25);
                        let dateSelesai;
                        let selesai;
                        if (data.tanggalSelesai) {
                            dateSelesai = new Date(data.tanggalSelesai.seconds * 1000).toString().replace('GMT+0700 (Western Indonesia Time)', '');
                            selesai = dateSelesai.slice(4, 15);
                        }
                        return (<TableData key={index}>
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
                                <span>{data.tanggalSelesai ? selesai : '-'}</span>
                            </div>
                            <div className='table-data-item'>
                                <span>{data.status === '1' ? 'Belum Selesai' : 'Sudah Selesai'}</span>
                            </div>
                            <div className='table-data-item'>
                                <CustomButton value='Detail' onClick={() => handleDetail(data)} />
                            </div>
                        </TableData>)
                    }
                    )}

                </div>
                <RightDetail active={stateRightDefail} bigger noPaddingTop>
                    <TableHeader items={['No', 'Obat', 'Jumlah Request']} />
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
                            </React.Fragment>
                        </TableData>
                    ))}
                </RightDetail>
            </div>
            <Footer />

            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Permintaan Distribusi'
                    text='Silahkan isi form di samping ini, untuk melakukan permintaan distribusi'
                    footer='Pastikan isi form berikut dengan benar, agar tidak terjadi kesalah pahaman'
                    bgcolor='F48A16'
                    color='fff'
                />
                <SideOverlayBlank>
                    <SideOverlayHeader />
                    <FormContainerScrollable className='form'>
                        <Select
                            name='obat'
                            closeMenuOnSelect
                            components={animatedComponents}
                            options={options}
                            className='mb-1 fullwidth'
                            onChange={handleSelectChange}
                        />
                        {request.items.map((item, index) =>
                            <div className='request-container' key={index}>
                                <CustomInput type='text' name='obat' value={item.obat} data-id={index} onChange={handleChange} readOnly />
                                <CustomInput type='number' name='jumlah' value={item.jumlah} data-id={index} onChange={handleChange} className='custom-input mini' />
                                <CustomButton type='button' value='X' onClick={() => handleRemove(index)} />
                            </div>
                        )}

                    </FormContainerScrollable>
                    <div className='button-group'>
                        <CustomButton type='button' value='Reset' color='dark' onClick={() => setRequest({ ...request, items: [] })} />
                        <CustomButton type='button' value='Simpan' onClick={handleSubmit} />
                    </div>
                </SideOverlayBlank>
            </FullscreenOverlay>

        </div>
    )
}

const mapStateToProps = state => ({
    stateRightDefail: state.toggle.toggleRightDetail,
    stateOverlay: state.toggle.toggleOverlay,
    distribution: state.distribution.distribution,
    medicine: state.medicine.medicine,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    toggleRightDetail: data => dispatch(toggleRightDetail(data)),
    toggleOverlay: data => dispatch(toggleOverlay(data)),
    addDistribution: data => dispatch(addDistribution(data)),
    removeDistribution: data => dispatch(removeDistribution(data)),
    selectDistribution: data => dispatch(selectDistribution(data)),
    addMedicine: data => dispatch(addMedicine(data)),
    addSelectedUser: data => dispatch(addSelectedUser(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDistribution);