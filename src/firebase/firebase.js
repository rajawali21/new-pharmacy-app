import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD4tdvjoS0RrK3NWHpB5ptHqaY5sGER1-o",
    authDomain: "farmasi-4ddd8.firebaseapp.com",
    projectId: "farmasi-4ddd8",
    storageBucket: "farmasi-4ddd8.appspot.com",
    messagingSenderId: "661791675763",
    appId: "1:661791675763:web:4dff655bb2f802061e2106",
    measurementId: "G-NEFSDZ1VMC"
  };

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