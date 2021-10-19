import { addLogs, editUser } from "./firebaseFunctions";

export const changePage = (uid, nextLocation, cb) => {
    editUser(uid, { position: nextLocation }).then(() => {
        addLogs(uid, "pageChange", { nextLocation }).then(() => {
            console.log("Page changed")
            cb(nextLocation)
        })
    })
}

export const optionSelectT = (uid, optionId) =>{
    addLogs(uid, "optionSelect_T", { optionId })
}

export const submitPuzzle = (uid) => {
    addLogs(uid, "submitPuzzle", {})
}

export const startPuzzle = (uid) => {
    addLogs(uid, "startPuzzle", {})
}

export const checkPuzzle = (uid)=>{
    addLogs(uid, "checkPuzzle", {})
}
export const endPuzzle =(uid)=>{
    addLogs(uid, "endPuzzle", {})
}

export const clearPuzzle =(uid)=>{
    addLogs(uid, "clearPuzzle", {})
}