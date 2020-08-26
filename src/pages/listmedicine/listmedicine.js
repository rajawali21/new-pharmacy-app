import React, { useEffect } from 'react';
import './listmedicine.css';

// Other Library
import { addNewMedicine, firestore, updateMedicine, deleteMedicine } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addMedicine, removeMedicine } from '../../redux/medicine/medicine.action';

// Other Component
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CustomInput from '../../component/custom-input/custom-input';
import TableHeader from '../../component/table-header/table-header';
import TableData from '../../component/table-data/table-data';
import CustomButton from '../../component/custom-button/custom-button';

const ListMedicine = ({ addMedicine, medicine, removeMedicine }) => {

    useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('medicine');

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();
                console.log(changes);
                changes.forEach(change => {
                    if (change.type === 'added') {
                        addMedicine({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addMedicine({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        removeMedicine({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addMedicine, removeMedicine])

    const [form, setForm] = React.useState({
        name: '',
        quantity: ''
    })

    const [isEdit, setEdit] = React.useState(false)

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await addNewMedicine(form);
            setForm({ name: '', quantity: '' })

        } catch (e) {
            alert(e.message)
        }
    }

    const handleEdit = (item) => {

        setEdit(true)

        setForm({
            id: item.id,
            name: item.name,
            quantity: item.quantity
        })

    }

    const handleUpdate = async (event) => {

        event.preventDefault();

        await updateMedicine(form)
        // editMedicine(form)

        setEdit(false);
        setForm({
            name: '',
            quantity: ''
        })
    }

    const handleDelete = async item => {

        await deleteMedicine(item);
        // removeMedicine(item)

    }

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());

    }

    return (
        <div>
            <HeaderAdmin />
            <div className='list-medicine'>
                <PageHeader title='Medicine'
                    colorSchema='#273B74'
                    buttonColor='outline-blue'
                    onChange={handleSearch}
                    noAddButton />
                <SectionSeparator />
                <form className='medicine-form'>
                    {isEdit ? <h2>Edit Medicine</h2> : <h2>Add Medicine</h2>}

                    <div className='input-group'>
                        <CustomInput
                            type='text'
                            name='name'
                            placeholder='Enter name of the medicine'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <CustomInput
                            type='number'
                            name='quantity'
                            placeholder='Enter quantitiy'
                            value={form.quantity}
                            onChange={handleChange}
                        />

                        <button type='submit' className='non-custom-button' onClick={isEdit ? handleUpdate : handleSubmit}>{isEdit ? 'Update' : 'Add'}</button>

                    </div>
                </form>
                <TableHeader items={['No', 'Nama', 'Quantity', 'Details']} />
                {medicine.filter(data => data.name.toLowerCase().includes(search)).map((item, index) => (
                    <TableData key={index}>
                        <React.Fragment>
                            <div className='table-data-item'>
                                <span>{index + 1}</span>
                            </div>
                            <div className='table-data-item'>
                                <span>{item.name}</span>
                            </div>
                            <div className='table-data-item'>
                                <span>{item.quantity}</span>
                            </div>
                            <div className='table-data-item'>
                                <CustomButton value='Edit' color='outline-primary' onClick={() => handleEdit(item)} />
                                <CustomButton value='Delete' color='outline-orange' onClick={() => handleDelete(item)} />
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
    medicine: state.medicine.medicine
})

const mapDispatchToProps = dispatch => ({
    addMedicine: (medicine) => dispatch(addMedicine(medicine)),
    removeMedicine: (medicine) => dispatch(removeMedicine(medicine))

})

export default connect(mapStateToProps, mapDispatchToProps)(ListMedicine);