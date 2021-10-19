import React from "react";
import { FeedbackContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import Instructions from "./Instructions";
import Task from "./Task";

function Feedback(props) {
  let currentPath = appBasePath + "feedback/"
  return <FeedbackContainer>
    <Switch>
      <Route path={currentPath + "instuctions"} component={Instructions} />
      <Route path={currentPath + "task"} component={Task} />
      <Route path={currentPath} component={Instructions} />
    </Switch>
  </FeedbackContainer>;
}
export default Feedback;