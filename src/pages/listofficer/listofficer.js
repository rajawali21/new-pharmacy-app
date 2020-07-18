import React from 'react';
import './listofficer.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';
import { firestore } from '../../firebase/firebase';

import { connect } from 'react-redux';
import { addOfficer } from '../../redux/user/user.action';
import { toggleOverlay } from '../../redux/toggle/toggle.action';

const ListOfficer = ({ addOfficer, officer }) => {

    React.useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('users').where('isOfficer', '==', true);

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();

                changes.forEach(change => {
                    if (change.type === 'added') {
                        addOfficer({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addOfficer({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        // removeMedicine({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addOfficer])

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());
    }

    return (
        <div>
            <HeaderAdmin />
            <div className='list-officer'>
                <PageHeader title='Officer' buttonColor='outline-primary' onChange={handleSearch} noAddButton />
                <SectionSeparator />
                <CardGroup>
                    {officer.filter(data => data.displayName.toLowerCase().includes(search)).map((data, index) => <CardUser key={index} data={data} buttonColor='outline-success' />)}
                </CardGroup>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    officer: state.user.officer,
    stateOverlay: state.toggle.toggleOverlay
})

const mapDispatchToProps = dispatch => ({
    addOfficer: officer => dispatch(addOfficer(officer)),
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListOfficer);