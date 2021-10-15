import firebase from "./firebaseConfig";
import { getFirestore, collection, getDocs, updateDoc, addDoc, getDoc, doc } from 'firebase/firestore';

const db = getFirestore(firebase);
// db.settings({ timestampsInSnapshots: true });
const userDB = collection(db, "users")

export async function checkUser(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return true
    } else {
        return false
    }
}

export async function addUser(userDetails) {
    const uid = await addDoc(userDB, userDetails);
    console.log("Added user with uid: ", uid.id)
    return uid.id
}

export async function editUser(uid, newUserDetails) {
    const washingtonRef = doc(db, "users", uid);
    return await updateDoc(washingtonRef, newUserDetails)
        .then(() => { return true })
        .catch((e) => { console.log(e); return false })
}

export async function getUser(uid, field = undefined) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        if (field)
            return docSnap.data()[field]
        else
            return docSnap.data()
    } else {
        return false
    }
}