import React, { useEffect } from 'react';
import './listmedicine.css';

// Other Library
import { addNewMedicine, firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addMedicine, setMedicine } from '../../redux/medicine/medicine.action';

// Other Component
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CustomInput from '../../component/custom-input/custom-input';
import TableHeader from '../../component/table-header/table-header';
import TableData from '../../component/table-data/table-data';
import CustomButton from '../../component/custom-button/custom-button';

const ListMedicine = ({ addMedicine, setMedicine, medicine }) => {

    useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('medicine');
            // const snapShot = await userRef.get();
            // let medicine = []
            // snapShot.forEach(doc => {
            //     medicine.push({
            //         id: doc.id,
            //         ...doc.data()
            //     })
            // })
            // setMedicine(medicine)

            userRef.onSnapshot(async snap => {
                const data = snap.docChanges();
                console.log(data);
                data.forEach(change => {
                    addMedicine(change.doc.data())
                })
            })

        }

        console.log('this is use effect')

        getData();
    }, [addMedicine])

    const [form, setForm] = React.useState({
        name: '',
        quantity: ''
    })

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

    return (
        <div>
            <HeaderAdmin />
            <div className='list-medicine'>
                <PageHeader title='Medicine' colorSchema='#273B74' buttonColor='outline-blue' noAddButton />
                <SectionSeparator />
                <form className='medicine-form' onSubmit={handleSubmit}>
                    <h2>Add Medicine</h2>
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
                        <button type='submit' className='non-custom-button'>Add</button>
                    </div>
                </form>
                <TableHeader items={['No', 'Nama', 'Quantity', 'Details']} />
                {medicine.map((item, index) => (
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
                                <CustomButton value='Detail' />
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
    setMedicine: (medicine) => dispatch(setMedicine(medicine))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListMedicine);