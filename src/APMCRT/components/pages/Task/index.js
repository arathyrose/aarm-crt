import React from "react";
import { TaskContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import Instructions from "./Instructions";
import Start from "./Start"
import Introduction from "./Introduction";
import Example from "./Example";
import PuzzlePage from "./PuzzlePage";
import End from "./End";

function Task(props) {
  let currentPath = appBasePath + "task/"
  return <TaskContainer>
    <Switch>
      <Route path={currentPath + "start"} component={Start} />
      <Route path={currentPath + "introduction"} component={Introduction} />
      <Route path={currentPath + "example"} component={Example} />
      <Route path={currentPath + "instruction"} component={Instructions} />
      <Route path={currentPath + "puzzle"} component={PuzzlePage} />
      <Route path={currentPath + "end"} component={End} />
      <Route path={currentPath} component={Start} />
    </Switch>
  </TaskContainer>;
}
export default Task;