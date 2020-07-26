import React, { useState, useEffect } from 'react';
import './request-overlay.css';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/toggle/toggle.action';
// import { addMedicine } from '../../redux/medicine/medicine.action';

// Library
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { firestore, addNewRequest } from '../../firebase/firebase';
import { withRouter } from 'react-router-dom';

// Other Components
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import FormContainerScrollable from '../../component/form-container-scrollable/form-container-scrollable';
import CustomInput from '../../component/custom-input/custom-input';
import FormGroup from '../../component/form-group/form-group';
import CustomButton from '../../component/custom-button/custom-button';

const RequestOverlay = ({ stateOverlay, currentUser, history, toggleOverlay }) => {

    const animatedComponents = makeAnimated();
    const [listMedicine, setListMedicine] = useState([])


    useEffect(() => {
        async function getData() {
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

        getData()
    }, [])


    const options = listMedicine;

    const [request, setRequest] = useState({
        items: [{ id: '', obat: '', jumlah: '', max: '', approved: '' }],
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

    const handleChange = (e) => {


        let items = [...request.items];
        if (parseInt(e.target.value) > parseInt(items[e.target.dataset.id]['max'])) {
            console.log(parseInt(e.target.value) > parseInt(items[e.target.dataset.id]['max']));
            e.target.value = items[e.target.dataset.id]['max'];
        }
        items[e.target.dataset.id]['jumlah'] = e.target.value
        setRequest({ ...request, items })
    }

    const handleSelectChange = (data, property) => {
        let items = [...request.items];

        const existingObat = items.find(item => item.obat === data.value);

        if (existingObat) {
            alert('Obat sudah dipilih');
        } else {
            items[property.name]['obat'] = data.value;
            items[property.name]['id'] = data.id;
        }

        items[property.name]['max'] = data.quantity;
        setRequest({ ...request, items });
    }

    const addForm = () => {
        let item = [...request.items];
        setRequest({ ...request, items: [...item, { obat: '', jumlah: '', max: '', approved: '' }] })
    }

    const handleRemove = (index) => {
        let items = [...request.items];
        items.splice(index, 1)

        setRequest({ ...request, items })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addNewRequest(request);
            setRequest({
                items: [{ id: '', obat: '', jumlah: '', max: '', approved: '' }],
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
            toggleOverlay();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Request Obat'
                    text='Silahkan lengkapi form dibawah ini'
                    footer='Pastikan isi form tersebut dengan benar, agar requestmu bisa langsung kita proses'
                    bgcolor='40BCFB'
                    color='fff'
                />
                <SideOverlayBlank onSubmit={handleSubmit}>
                    <SideOverlayHeader />
                    <FormContainerScrollable>
                        {request.items.map((item, index) => (
                            <FormGroup remove={() => handleRemove(index)} key={index}>
                                <div >
                                    <Select
                                        name={index}
                                        onChange={handleSelectChange}
                                        closeMenuOnSelect
                                        components={animatedComponents}
                                        options={options}
                                        className='mb-1'
                                        value={options.filter(data => data.value === item.obat)}

                                    />
                                    <CustomInput
                                        type='number'
                                        placeholder={item.max === '' ? 'Silahkan Pilih Obat' : `Stok Saat Ini ${item.max}`}
                                        className='jumlah custom-input'
                                        onChange={handleChange}
                                        data-id={index}
                                        value={item.jumlah !== '' && item.jumlah}
                                    />
                                </div>
                            </FormGroup>
                        ))}
                    </FormContainerScrollable>
                    <div className='button-group'>
                        <CustomButton type='button' value='Tambah' color='dark' onClick={addForm} />
                        <CustomButton type='submit' value='Simpan' />
                    </div>
                </SideOverlayBlank>
            </FullscreenOverlay>
        </div>
    )
}

const mapStateToProps = state => ({
    stateOverlay: state.toggle.toggleOverlay,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = disptach => ({
    toggleOverlay: () => disptach(toggleOverlay())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestOverlay));