import React from "react";
import { BodyContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import Home from "../pages/Home";
import AnotherPage from "../pages/AnotherPage";

function Body(props) {
  return <BodyContainer>
    <Switch>
      <Route path={appBasePath+"another"} component={AnotherPage}/>
      <Route path={appBasePath} component={Home}/>
    </Switch>
  </BodyContainer>;
}
export default Body;