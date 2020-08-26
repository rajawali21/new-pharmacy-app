import React, { useEffect } from 'react';
import './officermedicine.css';

// Other Library
import { selectStock, firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addStock, removeStock } from '../../redux/medicine/medicine.action';

// Other Component
import HeaderOfficer from '../../component/header-oficer/header-officer';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CustomInput from '../../component/custom-input/custom-input';
import TableHeader from '../../component/table-header/table-header';
import TableData from '../../component/table-data/table-data';
import CustomButton from '../../component/custom-button/custom-button';

// Other
import { useSnackbar } from 'notistack';

const OfficerMedicine = ({ addStock, stock, removeStock, currentUser }) => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('department').doc(currentUser.department).collection('stock');

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();
                console.log(changes);
                changes.forEach(change => {
                    if (change.type === 'added') {
                        addStock({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addStock({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        removeStock({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addStock, removeStock, currentUser])

    const [form, setForm] = React.useState({
        id: '',
        name: '',
        jumlah: '',
        department: currentUser.department,
        max: 0
    })


    const handleChange = event => {

        if (parseInt(event.target.value) > form.max) {
            event.target.value = parseInt(form.max)
        }

        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await selectStock(form);
            setForm({ ...form, name: '', jumlah: '', id: '' })
            enqueueSnackbar('Data obat sudah diupdate', { variant: 'success' });
        } catch (e) {
            alert(e.message)
        }
    }


    const handleSelect = (data) => {
        setForm({
            ...form,
            name: data.name,
            id: data.id,
            max: data.jumlah,
            jumlah: ''
        })
    }

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());

    }


    return (
        <div>
            <HeaderOfficer />
            <div className='list-medicine'>
                <PageHeader title='Medicine Stock'
                    onChange={handleSearch}
                    noAddButton />
                <SectionSeparator />
                <form className='medicine-form'>
                    <h2>Select Medicine</h2>

                    <div className='input-group'>
                        <CustomInput
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <CustomInput
                            type='number'
                            name='jumlah'
                            value={form.jumlah}
                            onChange={handleChange}
                        />


                        <button type='submit' onClick={handleSubmit}>Submit</button>

                    </div>
                </form>
                <TableHeader items={['No', 'Nama', 'Quantity', 'Details']} />
                {stock.filter(data => data.name.toLowerCase().includes(search)).map((item, index) => (
                    <TableData key={index}>
                        <React.Fragment>
                            <div className='table-data-item'>
                                <span>{index + 1}</span>
                            </div>
                            <div className='table-data-item'>
                                <span>{item.name}</span>
                            </div>
                            <div className='table-data-item'>
                                <span>{item.jumlah}</span>
                            </div>
                            <div className='table-data-item'>
                                <CustomButton value='Select' color='outline-primary' onClick={() => handleSelect(item)} />
                            </div>
                        </React.Fragment>
                    </TableData>
                ))}
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    stock: state.medicine.stock,
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    addStock: (medicine) => dispatch(addStock(medicine)),
    removeStock: (medicine) => dispatch(removeStock(medicine))

})

export default connect(mapStateToProps, mapDispatchToProps)(OfficerMedicine);