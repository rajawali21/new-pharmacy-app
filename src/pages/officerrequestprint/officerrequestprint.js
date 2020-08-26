import React from 'react';
import './officerrequest.css';

// Other Component
import TableData from '../../component/table-data/table-data';

// Redux
import { connect } from 'react-redux';

import { firestore } from '../../firebase/firebase';
import { selectRequest } from '../../redux/request/request.action';
import TableHeaderRequest from '../../component/table-header-request/table-header';
import SectionSeparator from '../../component/section-separator/section-separator';

const OfficerRequestPrint = ({ currentUser, history, match, selectRequest, selectedRequest }) => {

    React.useEffect(() => {
        async function getData() {
            const requestRef = firestore.collection('request').doc(match.params.reqId);

            requestRef.onSnapshot(snap => {
                selectRequest({
                    id: snap.id,
                    ...snap.data()
                })
            })
        }

        getData();
    }, [selectRequest, match.params.reqId])


    return (
        <React.Fragment>
            <div className='officer-request'>
                <div className={`left-side`}>
                    <div className='table-detail'>
                        <p>Requestor : {selectedRequest && selectedRequest.user.displayName}</p>
                        <p>Department : {selectedRequest && selectedRequest.user.department}</p>
                    </div>
                    <div className='table-detail'>
                        <p>Tanggal Request : {selectedRequest && new Date(selectedRequest.tanggalRequest.seconds * 1000).toString().replace('GMT+0700 (Western Indonesia Time)', '')}</p>
                        <p>No Handphone : {selectedRequest && selectedRequest.user.noHp}</p>
                    </div>
                    <SectionSeparator />
                    <TableHeaderRequest />
                    {selectedRequest && selectedRequest.items.map((data, index) => {
                        return (
                            <React.Fragment key={index}>
                                <TableData>
                                    <div style={{ width: '5%' }} className='table-data-item'>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div style={{ width: '45%' }} className='table-data-item'>
                                        <span>{data.obat}</span>
                                    </div>
                                    <div style={{ width: '15%' }} className='table-data-item'>
                                        <span>{data.jumlah}</span>
                                    </div>
                                    <div style={{ width: '15%' }} className='table-data-item'>
                                        {data.approved}
                                    </div>
                                </TableData>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    selectedRequest: state.request.selectedRequest
})

const mapDispatchToProps = dispatch => ({
    selectRequest: request => dispatch(selectRequest(request))
})

export default connect(mapStateToProps, mapDispatchToProps)(OfficerRequestPrint);