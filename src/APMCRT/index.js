import React from "react";
import { APMCRTContainer } from "./styles";
import Body from "./components/Body";
import { Context } from "./Store";
import Splash from "./components/pages/Splash";
import { appBasePath } from "./config/paths";
import { setUserDetails } from "./Store/user/actions";
import { useHistory } from "react-router-dom";
import { checkUser, getUserFromFirebase } from "./services/firebaseFunctions";
import { createUserAndLogin } from "./services/getDeviceDetails";

function APMCRT(/* props */) {
  const { dispatch } = React.useContext(Context);
  const [checkLocalToken, setLocalTokenStatus] = React.useState(false);
  const history = useHistory();
  React.useEffect(() => {
    let localToken = localStorage.getItem("token")
    if (localToken) {
      // check in firebase the current progress of the user
      checkUser(localToken).then((userExist) => {
        console.log("User exists? ", userExist)
        if (userExist) {
          // check where he is now
          let uid = localToken
          getUserFromFirebase(uid, ['position', 'APMType', 'PuzzleTypes', 'currentIteration']).then((finalData) => {
            console.log("data retrieved for uid: ", uid, " is ", finalData)
            setUserDetails({ position: finalData.position, APMType: finalData.APMType, uid: uid, PuzzleTypes: finalData.PuzzleTypes, currentIteration: finalData.currentIteration })(dispatch);
            if (finalData.position) {
              history.push(appBasePath + finalData.position)
              setLocalTokenStatus(true)
            }
            else {
              // place him at the start
              history.push(appBasePath + "start")
              setLocalTokenStatus(true)
            }
          }).catch((err) => {
            // the user has something inherently wrong with him
            console.log("Error", err)
            history.push(appBasePath + "start")
            createUserAndLogin((details) => {
              setUserDetails(details)(dispatch);
              history.push(appBasePath + "start")
              setLocalTokenStatus(true)
            })
          })
        }
        else {
          localStorage.removeItem("token")
          createUserAndLogin((details) => {
            setUserDetails(details)(dispatch);
            history.push(appBasePath + "start")
            setLocalTokenStatus(true)
          })
        }
      })
    }
    else {
      // the user has not logged in
      createUserAndLogin((details) => {
        setUserDetails(details)(dispatch);
        history.push(appBasePath + "start")
        setLocalTokenStatus(true)
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!checkLocalToken) {
    return <APMCRTContainer>
      <Splash />
    </APMCRTContainer>
  }
  else {
    return <APMCRTContainer>
      <Body />
    </APMCRTContainer>;
  }

}
export default APMCRT;