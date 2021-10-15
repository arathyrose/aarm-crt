import React from "react";
import { BodyContainer } from "./styles";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import Home from "../pages/Home";
import Demographic from "../pages/Demographic";
import NavBar from "../NavBar"
import Start from "../pages/Start"
import { getUser } from "../../Store/user/accessors";
import { Context } from "../../Store";
import Task from "../pages/Task";


function Body(props) {
  const { state, dispatch } = React.useContext(Context);
  const history = useHistory();
  console.log(getUser(state))

  return <BodyContainer>
    <NavBar />
    <Switch>
      <Route path={appBasePath + "start"} component={Start} />
      <Route path={appBasePath + "demographic"} component={Demographic} />
      <Route path={appBasePath + "task"} component={Task} />
      
      <Route path={appBasePath} component={Home} />
    </Switch>
  </BodyContainer>;
}
export default Body;