import React, { useEffect } from 'react';
import './listdepartment.css';

// Other Library
import { firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addDepartment, removeDepartment, addStock } from '../../redux/department/department.action';
import { toggleRightDetail } from '../../redux/toggle/toggle.action';
import RightDetail from '../../component/right-detail/right-detail';



// Other Component
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CustomInput from '../../component/custom-input/custom-input';
import TableHeader from '../../component/table-header/table-header';
import TableData from '../../component/table-data/table-data';
import CustomButton from '../../component/custom-button/custom-button';
import { useSnackbar } from 'notistack';

const ListDepartment = ({ addDepartment, department, removeDepartment, stateRightDefail, toggleRightDetail, stock, addStock }) => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('department');

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();
                console.log(changes);
                changes.forEach(change => {
                    console.log(change.doc.id)
                    if (change.type === 'added') {
                        addDepartment({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addDepartment({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        removeDepartment({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addDepartment, removeDepartment])

    const [form, setForm] = React.useState({
        name: ''
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
            const departmentRef = firestore.collection('department').doc(form.name);
            await departmentRef.set({
                name: form.name
            }, { merge: true })
            setForm({ name: '' })
            enqueueSnackbar('Data department telah disimpan', { variant: 'success' });
        } catch (e) {
            alert(e.message)
        }
    }

    const handleEdit = (item) => {

        setEdit(true)

        setForm({
            name: item.name,
            id: item.id
        })

    }

    const handleUpdate = async (event) => {

        event.preventDefault();

        try {
            const departmentRef = firestore.collection('department').doc(form.id);
            await departmentRef.update({
                name: form.name
            })
            enqueueSnackbar('Data department telah diupdate', { variant: 'success' });
        } catch (e) {
            alert(e.message)
        }

        setEdit(false);
        setForm({
            name: '',
        })
    }

    const handleDetail = async item => {
        toggleRightDetail(true);
        const stockRef = firestore.collection('department').doc(item.id).collection('stock');
        stockRef.onSnapshot(async snap => {
            const changes = snap.docChanges();
            console.log(changes);
            changes.forEach(change => {
                addStock({ id: change.doc.id, ...change.doc.data() })
            })
        })
    }

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());

    }

    return (
        <div>
            <HeaderAdmin />
            <div className='list-department'>
                <div className={`left-side ${stateRightDefail && 'minified'}`}>
                    <PageHeader title='Department'
                        buttonColor='outline-blue'
                        onChange={handleSearch}
                        noAddButton />
                    <SectionSeparator />
                    <form className='department-form'>
                        {isEdit ? <h2>Edit Department</h2> : <h2>Add Department</h2>}

                        <div className='input-group'>
                            <CustomInput
                                type='text'
                                name='name'
                                placeholder='Enter name of the department'
                                value={form.name}
                                onChange={handleChange}
                            />

                            <button type='submit' className='non-custom-button' onClick={isEdit ? handleUpdate : handleSubmit}>{isEdit ? 'Update' : 'Add'}</button>

                        </div>
                    </form>
                    <TableHeader items={['No', 'Nama', 'Details']} />
                    {department.filter(data => data.name.toLowerCase().includes(search)).map((item, index) => (
                        <TableData key={index}>
                            <React.Fragment>
                                <div className='table-data-item'>
                                    <span>{index + 1}</span>
                                </div>
                                <div className='table-data-item'>
                                    <span>{item.name}</span>
                                </div>
                                <div className='table-data-item'>
                                    <CustomButton value='Edit' color='outline-primary' onClick={() => handleEdit(item)} />
                                    <CustomButton value='Detail' color='outline-orange' onClick={() => handleDetail(item)} />
                                </div>
                            </React.Fragment>
                        </TableData>
                    ))}
                </div>
                {stock &&
                    <RightDetail active={stateRightDefail} title={`ICU's Medicine Stock`} bigger>
                        <TableHeader items={['No', 'Obat', 'jumlah']} />
                        {stock.map((data, index) => (
                            <TableData key={index}>
                                <React.Fragment>
                                    <div style={{ width: '5%' }} className='table-data-item'>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div style={{ width: '45%' }} className='table-data-item'>
                                        <span>{data.name}</span>
                                    </div>
                                    <div style={{ width: '15%' }} className='table-data-item'>
                                        <span>{data.jumlah}</span>
                                    </div>
                                </React.Fragment>
                            </TableData>
                        ))}

                    </RightDetail>
                }

            </div>

            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    stateRightDefail: state.toggle.toggleRightDetail,
    department: state.department.department,
    stock: state.department.stock,
})

const mapDispatchToProps = dispatch => ({
    addDepartment: (medicine) => dispatch(addDepartment(medicine)),
    removeDepartment: (medicine) => dispatch(removeDepartment(medicine)),
    addStock: (medicine) => dispatch(addStock(medicine)),
    toggleRightDetail: (data) => dispatch(toggleRightDetail(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDepartment);