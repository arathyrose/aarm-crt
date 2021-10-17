import React from "react";
import { APMCRTContainer } from "./styles";
import Body from "./components/Body";
import { Context } from "./Store";
import Splash from "./components/pages/Splash";
import { appBasePath } from "./config/paths";
// import SecureService from "./services/Secure";
import { setUserDetails } from "./Store/user/actions";
import { useHistory } from "react-router-dom";
import { checkUser, getUser } from "./services/firebaseFunctions";

function APMCRT(/* props */) {
  const { /* state, */ dispatch } = React.useContext(Context);
  const [checkLocalToken, setLocalTokenStatus] = React.useState(false);
  const history = useHistory();
  React.useEffect(() => {
    if (window.location.pathname !== appBasePath + "star2t") {
      let localToken = localStorage.getItem("token")
      if (localToken) {
        // check in firebase the current progress of the user
        checkUser(localToken).then((userExist) => {
          console.log("User exists? ", userExist)
          if (userExist) {
            // check where he is now
            let uid = localToken
            getUser(uid, ['position', 'APMType']).then((finalData) => {
              console.log(finalData)
              setUserDetails({ position: finalData.position, APMType: finalData.APMType, uid })(dispatch);
              if (finalData.position) {
                history.push(appBasePath + finalData.position)
                setLocalTokenStatus(true)
              }
              else {
                history.push(appBasePath + "start")
                setLocalTokenStatus(true)
              }
            }).catch((err) => {
              console.log("Error", err)
              history.push(appBasePath + "start")
              setLocalTokenStatus(true)
            })
          }
          else {
            localStorage.removeItem("token")
            history.push(appBasePath + "start")
            setLocalTokenStatus(true)
          }
        })
      }
      else {
        history.push(appBasePath + "start")
        setLocalTokenStatus(true)
      }
    }
    else {
      setLocalTokenStatus(true);
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