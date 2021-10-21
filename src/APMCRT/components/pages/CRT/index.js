import React from "react";
import { TaskContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import Instructions from "./Instructions";
import Start from "./Start"
import Task from "./Task";
import End from "./End";

function CRT(props) {
  let currentPath = appBasePath + "crt/"
  return <TaskContainer>
    <Switch>
      <Route path={currentPath + "start"} component={Start} />
      <Route path={currentPath + "instruction"} component={Instructions} />
      <Route path={currentPath + "task"} component={Task} />
      <Route path={currentPath + "end"} component={End} />
      <Route path={currentPath} component={Start} />
    </Switch>
  </TaskContainer>;
}
export default CRT;