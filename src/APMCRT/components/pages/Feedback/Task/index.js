import React from "react";
import { TaskContainer, MainPart, SubmitButton, ErrorMessage, SelectLikert } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Task() {
  const { state, dispatch } = React.useContext(Context);
  const uid = getUser(state).uid
  let history = useHistory()
  const [userForm, setUserForm] = React.useState({
    mentalDemand: -1,
    physicalDemand: -1,
    temporalDemand: -1,
    performance: -1,
    effort: -1,
    frustrationLevel: -1,
    uiDistraction: -1,
    additionalFeedback: "",
    upi: ""
  })
  const likertItems = {
    mentalDemand: { name: "Mental Demand", description: "How mentally demanding was the task?" },
    physicalDemand: { name: "Physical Demand", description: "How physically demanding was the task?" },
    temporalDemand: { name: "Temporal Demand", description: "How hurried or rushed was the pace of the task?" },
    performance: { name: "Performance", description: "How successful were you in accomplishing what you were asked to do?" },
    effort: { name: "Effort", description: "How hard did you have to work to accomplish your level of performance?" },
    frustrationLevel: { name: "Frustration Level", description: "How insecure, discouraged, irritated, stressed, and annoyed were you?" },
    uiDistraction: { name: "UI Distraction", description: "How distracting did you find the UI of the application" },
  }
  const [error, setError] = React.useState("");
  function setFormValue(field, value) {
    setUserForm({
      ...userForm,
      [field]: value,
    });
  }
  return (
    <TaskContainer>
      <MainPart>
        <p>Please fill in the following details:</p>
        {Object.keys(likertItems).map((item) => <div key={item} style={{ marginBottom: "1.2em" }}>
          <label>{likertItems[item].name} ({likertItems[item].description}): </label>
          <div style={{ display: "flex", flexDirection: "row" }}>  {[1, 2, 3, 4, 5, 6, 7].map((i) => <SelectLikert onClick={() => setFormValue(item, i)} selected={i <= userForm[item]} key={i}> {i}</SelectLikert>)}</div>
        </div>)}
        <div>
          <label>Feedback: (if any) </label> <br />
          <textarea type="text" style={{ width: "100%" }} value={userForm.additionalFeedback} onChange={(e) => setFormValue('additionalFeedback', e.target.value)} />
        </div>
        <div>
          <label> UPI code (optional) </label>
          <textarea type="text" style={{ width: "100%" }} value={userForm.upi} onChange={(e) => setFormValue('upi', e.target.value)} />
        </div>
        <SubmitButton onClick={() => {
          let feedbackError = false, errorMsg = ""
          for (let i in likertItems) {
            // console.log(i, likertItems[i].name, userForm[i])
            if (userForm[i] === -1) {
              feedbackError = true
              errorMsg += likertItems[i].name + " "
            }
          }
          if (feedbackError) {
            setError("The following fields are not filled: " + errorMsg)
            alert("The following fields are not filled: " + errorMsg)
          }
          else {
            editUser(uid, { feedback: userForm }).then(() => {
              changePage(getUser(state).uid, "thankyou/", (nextposition) => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
              })
            })
          }
        }} >
          Submit
        </SubmitButton>
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : <span></span>}
      </MainPart>
    </TaskContainer>
  );
}
export default Task;
