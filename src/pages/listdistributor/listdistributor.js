import React from 'react';
import './listdistributor.css';
import HeaderAdmin from '../../component/header-admin/header-admin';
import Footer from '../../component/footer/footer';
import PageHeader from '../../component/page-header/page-header';
import SectionSeparator from '../../component/section-separator/section-separator';
import CardGroup from '../../component/card-group/card-group';
import CardUser from '../../component/card-user/card-user';

//other Library
import { firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { addDistributor } from '../../redux/user/user.action';
import { toggleOverlay } from '../../redux/toggle/toggle.action';
import FullscreenOverlay from '../../component/fullscreen-overlay/fullscreen-overlay';
import SideOverlayText from '../../component/side-overlay-text/side-overlay-text';
import SideOverlayBlank from '../../component/side-overlay-blank/side-overlay-blank';
import SideOverlayHeader from '../../component/side-overlay-header/side-overlay-header';
import RegisterFormCard from '../../component/register-form-card/register-form-card';

const ListDistributor = ({ addDistributor, distributor, toggleOverlay, stateOverlay }) => {

    React.useEffect(() => {
        async function getData() {
            const userRef = firestore.collection('users').where('isDistributor', '==', true);

            userRef.onSnapshot(async snap => {
                const changes = snap.docChanges();

                changes.forEach(change => {
                    if (change.type === 'added') {
                        addDistributor({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'modified') {
                        addDistributor({ id: change.doc.id, ...change.doc.data() })
                    }
                    else if (change.type === 'removed') {
                        // removeMedicine({ id: change.doc.id, ...change.doc.data() });

                    }
                })
            })
        }

        getData();
    }, [addDistributor])

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        setSearch(event.target.value.toLowerCase());
    }

    return (
        <div>
            <HeaderAdmin />
            <div className='list-distributor'>
                <PageHeader title='Distributor' colorSchema='#F48A16' buttonColor='outline-orange' onChange={handleSearch} onClick={() => toggleOverlay()} />
                <SectionSeparator />
                <CardGroup>
                    {distributor.filter(data => data.displayName.toLowerCase().includes(search)).map((data, index) => <CardUser key={index} data={data} buttonColor='outline-success' />)}
                </CardGroup>
            </div>
            <Footer />

            <FullscreenOverlay active={stateOverlay}>
                <SideOverlayText
                    header='Form Tambah Distributir'
                    text='Silahkan isi form di samping ini, untuk menambah admin'
                    footer='Pastikan isi form berikut dengan benar, agar tidak terjadi kesalah pahaman dalam komunikasi dan data'
                    bgcolor='F48916'
                    color='fff'
                />
                <SideOverlayBlank>
                    <SideOverlayHeader />
                    <RegisterFormCard isDistributor />
                </SideOverlayBlank>
            </FullscreenOverlay>

        </div>
    )
}

const mapStateToProps = state => ({
    distributor: state.user.distributor,
    stateOverlay: state.toggle.toggleOverlay
})

const mapDispatchToProps = dispatch => ({
    addDistributor: distributor => dispatch(addDistributor(distributor)),
    toggleOverlay: () => dispatch(toggleOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDistributor);