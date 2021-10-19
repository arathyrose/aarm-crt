import React from "react";
import { BodyContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import Home from "../pages/Home";
import Demographic from "../pages/Demographic";
import NavBar from "../NavBar"
import Start from "../pages/Start"
import Task from "../pages/Task";
import CRT from "../pages/CRT";
import Feedback from "../pages/Feedback";
import ThankYou from "../pages/ThankYou";


function Body(props) {
  return <BodyContainer>
    <NavBar />
    <Switch>
      <Route path={appBasePath + "start"} component={Start} />
      <Route path={appBasePath + "demographic"} component={Demographic} />
      <Route path={appBasePath + "task"} component={Task} />
      <Route path={appBasePath + "crt"} component={CRT} />
      <Route path={appBasePath + "feedback"} component={Feedback} />
      <Route path={appBasePath + "thankyou"} component={ThankYou} />
      <Route path={appBasePath} component={Home} />
    </Switch>
  </BodyContainer>;
}
export default Body;