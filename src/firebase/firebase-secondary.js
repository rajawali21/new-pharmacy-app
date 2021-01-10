import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const otherConfig = {
    apiKey: "AIzaSyD4tdvjoS0RrK3NWHpB5ptHqaY5sGER1-o",
    authDomain: "farmasi-4ddd8.firebaseapp.com",
    projectId: "farmasi-4ddd8",
    storageBucket: "farmasi-4ddd8.appspot.com",
    messagingSenderId: "661791675763",
    appId: "1:661791675763:web:4dff655bb2f802061e2106",
    measurementId: "G-NEFSDZ1VMC"
  };

const secondaryApp = firebase.initializeApp(otherConfig, "Secondary");
export const auth2 = secondaryApp.auth();
export const firestore2 = secondaryApp.firestore();



export const createOfficer2 = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore2.doc(`users/${userAuth.uid}`);
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
export const createDistributor2 = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore2.doc(`users/${userAuth.uid}`);
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
export const createAdmin2 = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore2.doc(`users/${userAuth.uid}`);
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
                tanggalDibuat: tanggalDibuat,
                noHp: null,
                address: null,
                department: 'Farmasi',
                ...additionalData
            })
        } catch (error) {
            console.error(error)
        }
    }

    return snapShot;
}

export const addNewMedicine = async (data) => {
    const userRef = firestore2.collection(`medicine`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        try {
            await userRef.add({
                name: data.name,
                quantity: data.quantity
            })
        } catch (e) {
            console.log(e)
        }
    }

    return userRef;
}

export const updateMedicine = async (data) => {
    const userRef = firestore2.doc(`medicine/${data.id}`);

    try {
        await userRef.update({
            name: data.name,
            quantity: data.quantity
        })
    } catch (e) {
        console.log(e)
    }

    return userRef;
}

export const deleteMedicine = async (data) => {
    const userRef = firestore2.doc(`medicine/${data.id}`);

    try {
        await userRef.delete();
    } catch (e) {
        console.error(e)
    }

    return userRef;

}


// Admin List



export default secondaryApp;