import { initializeApp } from 'firebase/app';
import {collection, doc, getDocs, getFirestore, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getApi = async (path) => {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
};

export const postApi = async (path, id, data) => {
    const docRef = doc(db, path, id)
    await setDoc(docRef, data, { merge: true });
}

export { db };
