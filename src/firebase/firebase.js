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
                tanggalDibuat: tanggalDibuat,
                ...additionalData
            })
        } catch (error) {
            console.error(error)
        }
    }

    return userRef;
}

export const addNewMedicine = async (data) => {
    const userRef = firestore.collection(`medicine`);
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


export default firebase;