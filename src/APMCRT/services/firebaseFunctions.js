import firebase from "./firebaseConfig";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebase);
// db.settings({ timestampsInSnapshots: true });
const userDB = collection(db, "users")

export function checkUser(uid) {
    const user = userDB.doc(uid).get()
    if (user.exists) return true
    else return false
}

export function addUser(userDetails) {
    const uid = userDB.add(userDetails);
    console.log("Added user with uid: ", uid)
    return uid
}

export function editUser(uid, newUserDetails) {
    userDB.doc(uid).update(newUserDetails)
    return { msg: "success" }
}

export function getUser(uid, field = undefined) {
    if (field == undefined) return userDB.doc(uid).get().data()
    else return userDB.doc(uid).select(field).get()
}