import React from "react";
import { APMCRTContainer } from "./styles";
import Body from "./components/Body";
import { Context } from "./Store";
import Splash from "./components/pages/Splash";
import { appBasePath } from "./config/paths";
// import SecureService from "./services/Secure";
// import { setUserDetails } from "./Store/user/actions";
import { useHistory } from "react-router-dom";

function APMCRT(/* props */) {
  const { /* state, */ dispatch } = React.useContext(Context);
  const [checkLocalToken, setLocalTokenStatus] = React.useState(false);
  let history = useHistory();
  React.useEffect(() => {
    if (window.location.pathname !== appBasePath + "start") {
      let localToken = localStorage.getItem("token")
     /*  SecureService.verifyToken(localToken)
        .then((retrivedUser) => {
          setUserDetails(retrivedUser)(dispatch);
          setLocalTokenStatus(true);
        })
        .catch((err) => {
          localStorage.removeItem("token")
          if (
            window.location.pathname.includes(appBasePath) &&
            window.location.pathname !== appBasePath + "start"
          ) {
            history.push(appBasePath + "start");
          }
          setLocalTokenStatus(true);
        }); */
    }
    else {
      setLocalTokenStatus(true);
    }
  }, []);
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