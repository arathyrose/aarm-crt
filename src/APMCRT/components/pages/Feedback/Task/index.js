import React from "react";
import { TaskContainer, MainPart, SubmitButton, ErrorMessage } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";

function Task() {
  const { state, dispatch } = React.useContext(Context);
  const uid = getUser(state).uid
  let history = useHistory()
  const [userForm, setUserForm] = React.useState({
    mentalDemand: -1, physicalDemand: -1, temporalDemand: -1, performance: -1, effort: -1, frustrationLevel: -1,
    uiDistraction: -1,
    additionalFeedback: "",
    upi:""
  })
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
        <div>
          <label>Feedback: (if any) </label> <br />
          <textarea type="text" style={{width:"100%"}} value={userForm.additionalFeedback} onChange={(e) => setFormValue('additionalFeedback', e.target.value)} />
        </div>
        <div>
          <label> UPI code (optional) </label> 
          <textarea type="text" style={{width:"100%"}} value={userForm.upi} onChange={(e) => setFormValue('upi', e.target.value)} />
        </div>
        <SubmitButton onClick={() => {
          let feedbackError = false, errorMsg = ""
          if (feedbackError) {
            setError(errorMsg)
          }
          else {
            editUser(uid, { feedback: userForm }).then(() => {
              let nextposition = "thankyou/"
              editUser(uid, { position: nextposition }).then(() => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
              })
            }).catch((err) => { console.log(err) })
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
