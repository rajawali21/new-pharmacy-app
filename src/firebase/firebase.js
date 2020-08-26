import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDoHiehDHXIW7PPCbHxztdw9emdZivDsDk",
    authDomain: "pharmacy-db-c9def.firebaseapp.com",
    databaseURL: "https://pharmacy-db-c9def.firebaseio.com",
    projectId: "pharmacy-db-c9def",
    storageBucket: "pharmacy-db-c9def.appspot.com",
    messagingSenderId: "63044515864",
    appId: "1:63044515864:web:4fbb3d710521a8c0bf2b6d",
    measurementId: "G-E5V9SKW45R"
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);


export const createOfficer = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {

        const { displayName, email, photoURL } = userAuth;
        const tanggalDibuat = new Date();

        try {
            await userRef.set({
                displayName: displayName,
                email: email,
                photoUrl: photoURL,
                isAdmin: false,
                isDistributor: false,
                isOfficer: true,
                department: false,
                address: false,
                noHp: false,
                tanggalDibuat: tanggalDibuat,
                ...additionalData
            })
        } catch (error) {
            console.error(error)
        }
    }

    return userRef;
}

export const createDistributor = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {

        const { displayName, email, photoURL } = userAuth;
        const tanggalDibuat = new Date();

        try {
            await userRef.set({
                displayName: displayName,
                email: email,
                photoUrl: photoURL,
                isAdmin: false,
                isDistributor: true,
                isOfficer: false,
                tanggalDibuat: tanggalDibuat,
                ...additionalData
            })
        } catch (error) {
            console.error(error)
        }
    }

    return userRef;
}
export const createAdmin = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {

        const { displayName, email, photoURL } = userAuth;
        const tanggalDibuat = new Date();

        try {
            await userRef.set({
                displayName: displayName,
                email: email,
                photoUrl: photoURL,
                isAdmin: true,
                isDistributor: false,
                isOfficer: false,
                department: 'Farmasi',
                address: false,
                noHp: false,
                tanggalDibuat: tanggalDibuat,
                ...additionalData
            })
        } catch (error) {
            console.error(error)
        }
    }

    return snapShot;
}


// Medicne CRUD

export const addNewMedicine = async (data) => {
    const medicineRef = firestore.collection(`medicine`);
    const snapShot = await medicineRef.get();

    if (!snapShot.exists) {
        try {
            await medicineRef.add({
                name: data.name,
                quantity: data.quantity
            })
        } catch (e) {
            console.log(e)
        }
    }

    return medicineRef;
}

export const updateMedicine = async (data) => {
    const medicineRef = firestore.doc(`medicine/${data.id}`);

    try {
        await medicineRef.update({
            name: data.name,
            quantity: data.quantity
        })
    } catch (e) {
        console.log(e)
    }

    return medicineRef;
}

export const deleteMedicine = async (data) => {
    const medicineRef = firestore.doc(`medicine/${data.id}`);

    try {
        await medicineRef.delete();
    } catch (e) {
        console.error(e)
    }

    return medicineRef;

}


// Request CRUD
export const addNewRequest = async (data) => {
    const requestRef = firestore.collection('request');

    try {
        const tanggalRequest = new Date();
        await requestRef.add({
            items: data.items,
            tanggalRequest: tanggalRequest,
            status: '1',
            user: data.user
        })

    } catch (e) {
        console.log(e);
    }
}

// Request CRUD
export const selectStock = async (data) => {
    const stockRef = firestore.collection('department').doc(data.department).collection('stock').doc(data.id);

    try {
        await stockRef.update({
            jumlah: firebase.firestore.FieldValue.increment(parseInt(-data.jumlah))
        })

    } catch (e) {
        alert(e.message);
    }
}


export default firebase;