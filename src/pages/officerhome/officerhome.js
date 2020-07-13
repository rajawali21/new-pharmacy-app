import React, { useState } from 'react';
import './officerhome.css';

// Redux
import { connect } from 'react-redux';
import { toggleOverlay } from '../../redux/toggle/toggle.action';

// Library
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Other Components
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import OfficerHomeIllustration from '../../assets/illustration/illustration-2.png';
import RequestButtonGroup from '../../component/request-button-group/request-button-group';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import RequestButton from '../../component/request-button/request-button';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import FormContainerScrollable from '../../component/form-container-scrollable/form-container-scrollable';
import CustomInput from '../../component/custom-input/custom-input';
import FormGroup from '../../component/form-group/form-group';
import CustomButton from '../../component/custom-button/custom-button';

const OfficerHome = ({ stateOverlay, toggleOverlay }) => {

    const animatedComponents = makeAnimated();
    const options = [
        { value: 'null', label: 'Silahkan pilih obat' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const [request, setRequest] = useState({
        id: '',
        officer: '',
        items: [{ obat: '', jumlah: '' }]
    })

    const handleChange = (e) => {

        let items = [...request.items];
        items[e.target.dataset.id]['jumlah'] = e.target.value.toUpperCase()
        setRequest({ ...request, items })
    }

    const handleSelectChange = (data, property) => {
        let items = [...request.items];
        items[property.name]['obat'] = data.value
        setRequest({ ...request, items })
    }

    const addForm = () => {
        let item = [...request.items];
        setRequest({ ...request, items: [...item, { obat: '', jumlah: '' }] })
    }

    const handleRemove = (index) => {
        let items = [...request.items];
        items.splice(index, 1)

        setRequest({ ...request, items })
    }

    return (
        <div>
            <HeaderOfficer />
            <div className='officerhome'>
                <section className='showcase'>
                    <div className='showcase-text'>
                        <h1>Selamat Datang Petugas Medis</h1>
                        <p>Silahkan lakukan permintaan obat, kami akan sesegera mungkin menyiapkannya</p>
                    </div>
                    <img src={OfficerHomeIllustration} alt='OficerHomeIllustration' />
                </section>
                <RequestButtonGroup>
                    <RequestButton icon='fas fa-plus' value='Tambah Request' onClick={() => toggleOverlay()} />
                    <RequestButton icon='fas fa-spinner' value='Lihat Requestmu' />
                </RequestButtonGroup>
            </div>
            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Request Obat'
                    text='Silahkan lengkapi form dibawah ini'
                    footer='Pastikan isi form tersebut dengan benar, agar requestmu bisa langsung kita proses'
                    bgcolor='40BCFB'
                    color='fff'
                />
                <SideOverlayBlank>
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
                                        placeholder='Silahkan masukan jumlah'
                                        className='jumlah custom-input'
                                        onChange={handleChange}
                                        data-id={index}
                                        value={item.jumlah}
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
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    stateOverlay: state.toggle.toggleOverlay
})

const mapDispatchToProps = dispatch => ({
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(OfficerHome);