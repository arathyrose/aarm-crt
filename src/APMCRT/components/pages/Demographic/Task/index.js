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
    age: "",
    gender: "Male",
    otherGender: ""
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
          <label>Age: </label>    <input type="number" value={userForm.age} onChange={(e) => setFormValue('age', e.target.value)} />
        </div>
        <div> <label>Gender: </label> <select onChange={(e) => setFormValue('gender', e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
          {userForm.gender === "Other" ? <input type="text" value={userForm.otherGender} onChange={(e) => setFormValue('otherGender', e.target.value)} /> :
            <span></span>}
        </div>
        <SubmitButton onClick={() => {
          let ageError = false, genderError = false, errorMsg = ""
          if (userForm.age < 15 || userForm.age >= 99) {
            ageError = true
            errorMsg += "Please enter your correct age; "
          }
          if (userForm.gender === "Other" && userForm.otherGender === "") {
            genderError = true
            errorMsg += "Please enter your gender; "
          }
          if (ageError || genderError) {
            setError(errorMsg)
          }
          else {
            editUser(uid, { demographic: userForm }).then(() => {
              let nextposition = "task/start"
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
