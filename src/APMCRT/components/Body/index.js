import React from "react";
import { BodyContainer } from "./styles";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import Home from "../pages/Home";
import AnotherPage from "../pages/AnotherPage";
import NavBar from "../NavBar"
import Start from "../pages/Start"
import { getUser } from "../../Store/user/accessors";
import { Context } from "../../Store";


function Body(props) {
  const { state, dispatch } = React.useContext(Context);
  const history = useHistory();
  console.log(getUser(state))

  return <BodyContainer>
    <NavBar />
    <Switch>
      <Route path={appBasePath + "start"} component={Start} />
      <Route path={appBasePath} component={Home} />
    </Switch>
  </BodyContainer>;
}
export default Body;