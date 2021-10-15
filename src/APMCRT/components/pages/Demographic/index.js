import React from "react";
import { DemographicContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import Instructions from "./Instructions";
import Task from "./Task";

function Demographic(props) {
  let currentPath = appBasePath + "demographic/"
  return <DemographicContainer>
    <Switch>
      <Route path={currentPath + "instuctions"} component={Instructions} />
      <Route path={currentPath + "task"} component={Task} />
      <Route path={currentPath} component={Instructions} />
    </Switch>
  </DemographicContainer>;
}
export default Demographic;