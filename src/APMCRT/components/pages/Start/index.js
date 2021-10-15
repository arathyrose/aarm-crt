import React from "react";
import { StartContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import Home from "./Home"
import Details from "./Details"
import Consent from "./Consent"

function Start(props) {
  let currentPath = appBasePath + "start/"
  return <StartContainer>
    <Switch>
      <Route path={currentPath + "details"} component={Details} />
      <Route path={currentPath + "consent"} component={Consent} />
      <Route path={currentPath + "guidelines"} component={Home} />
      <Route path={currentPath} component={Home} />

    </Switch>
  </StartContainer>;
}
export default Start;