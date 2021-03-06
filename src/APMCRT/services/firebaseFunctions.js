import firebase from "./firebaseConfig";
import { getFirestore, collection, updateDoc, addDoc, getDoc, doc } from 'firebase/firestore';
import { getCurrentTime } from "./getDeviceDetails";

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
    console.log(userDetails)
    const uid = await addDoc(userDB, userDetails);
    console.log("Added user with uid: ", uid.id)
    return uid.id
}

export async function editUser(uid, newUserDetails) {
    try {
        const userRef = doc(db, "users", uid);
        return await updateDoc(userRef, newUserDetails)
            .then(() => { return true })
            .catch((e) => { console.log(e); return false })
    }
    catch (error) {
        console.log(error)
    }
}

export async function getUserFromFirebase(uid, field = undefined) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        if (field) {
            let finalData = {}
            let data = docSnap.data()
            for (let f in field) {
                let cf = field[f]
                finalData[cf] = data[cf]
            }
            return finalData
        }
        else
            return docSnap.data()
    } else {
        return false
    }
}

export async function addLogs(uid, actionType, parameters) {
    // logdata should contain
    //       uid, timestamp, position, action, parameters
    const logData = { uid, timestamp: getCurrentTime(), position: window.location.pathname, actionType, parameters }
    // console.log(logData)

    // store in different collection based on the type of the logs
    let logCollection = "newLogs"
    if (actionType.includes("Puzzle") || actionType === "optionSelect_T" || actionType === "dropOption") {
        logCollection = "puzzleLogs"
    }
    else if (actionType.includes("pageChange")) {
        logCollection = "pageChangeLogs"
    }
    else if (actionType.includes("CRT") || actionType.includes("changeTool")) {
        logCollection = "CRTLogs"
    }
    const logsDB = collection(db, logCollection)
    const logid = await addDoc(logsDB, logData);
    // console.log("Added logs in db: ", logid.id)
    return logid.id
}