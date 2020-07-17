import React from 'react';
import './adminhome.css';
import Showcase from '../../component/showcase/showcase';
import AdminIllustration from '../../assets/illustration/illustration-4.png'
import HeaderAdmin from '../../component/header-admin/header-admin';
import RequestButtonGroup from '../../component/request-button-group/request-button-group';
import RequestButton from '../../component/request-button/request-button';
import Footer from '../../component/footer/footer';

const AdminHome = ({ history }) => {
    return (
        <div>
            <HeaderAdmin />
            <div className='admin-home'>
                <Showcase
                    title='Selamat Datang Admin Farmasi'
                    text='Selalu tekun dan semangat dalam menjalani pekerjaan, banyak pasien dan petugas menunggu distribusi obat dari kalian'
                    image={AdminIllustration}
                    sizeImage='right-bottom'
                    color='#2ecc71'
                />
                <RequestButtonGroup>
                    <RequestButton value='Data Admin' icon='fas fa-users-cog' onClick={() => history.push('/listadmin')} />
                    <RequestButton value='Data Petugas' icon='fas fa-hospital-user' onClick={() => history.push('/listofficer')} />
                    <RequestButton value='Data Distibutor' icon='fas fa-people-arrows' onClick={() => history.push('/listdistributor')} />
                </RequestButtonGroup>
                <RequestButtonGroup>
                    <RequestButton value='List Obat' icon='fas fa-tablets' onClick={() => history.push('/listmedicine')} />
                    <RequestButton value='Permintaan Obat' icon='fas fa-book-medical' onClick={() => history.push('/listrequest')} />
                    <RequestButton value='Permintaan Distribusi' icon='fas fa-mortar-pestle' onClick={() => history.push('/listdistribution')} />
                </RequestButtonGroup>
            </div>
            <Footer />
        </div>
    )
}

export default AdminHome;