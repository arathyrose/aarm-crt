import React from "react";
import { BodyContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import Home from "../pages/Home";
import AnotherPage from "../pages/AnotherPage";
import NavBar from "../NavBar"

function Body(props) {
  return <BodyContainer>
    <NavBar />
    <Switch>
      <Route path={appBasePath + "start"} component={Home} />
      <Route path={appBasePath} component={Home} />
    </Switch>
  </BodyContainer>;
}
export default Body;