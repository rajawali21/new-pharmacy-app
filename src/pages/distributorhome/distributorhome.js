import React from 'react';
import './distributorhome.css';

// Library
// import { auth } from '../../firebase/firebase';

// Other Component
import Showcase from '../../component/showcase/showcase';
import RequestButtonGroup from '../../component/request-button-group/request-button-group';
import RequestButton from '../../component/request-button/request-button';
import Footer from '../../component/footer/footer';
import DistributorHomeIllustration from '../../assets/illustration/illustration-3.png';
import HeaderDistributor from '../../component/header-distributor/header-distributor';

const DistributorHome = ({ history }) => {

    return (
        <div>
            <HeaderDistributor />
            <div className='distributorhome'>
                <Showcase
                    image={DistributorHomeIllustration}
                    title='Selamat Datang Distributor'
                    text='Terima kasih telah bekerja sama dan memberikan pelayanan yang baik kepada kami'
                    color='#F48A16'
                    sizeImage='fixed'
                />
                <RequestButtonGroup>
                    <RequestButton icon='fas fa-spinner' value='Permintaan Distribusi' onClick={() => history.push('/distribution')} />
                </RequestButtonGroup>
            </div>
            <Footer />
        </div>
    )
}

export default DistributorHome;