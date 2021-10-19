import { addLogs, editUser } from "./firebaseFunctions";

export const changePage = (uid, nextLocation, cb) => {
    editUser(uid, { position: nextLocation }).then(() => {
        addLogs(uid, "pageChange", { nextLocation }).then(() => {
            console.log("Page changed")
            cb(nextLocation)
        })
    })
}
