import React from "react";
import { TaskContainer, MainPart, SubmitButton, ErrorMessage, Label, Input, FormRow } from "./styles";
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
  const Unselected = "Select an option"
  const [userForm, setUserForm] = React.useState({
    age: "",
    gender: Unselected,
    otherGender: "",
    handedness: Unselected,
    chosenStream: Unselected,
    year: Unselected,
    creativityLAQ: ""
  })
  const [error, setError] = React.useState("");
  const genderValues = ["Select an option", "Woman", "Man", "Transgender woman", "Transgender man", "Non-binary gender", "Non conforming gender",
    "Prefer not to say", "Not listed"]
  const Other = "Not listed"
  const handednessValues = ["Select an option", "Left", "Right", "Ambidextrous", "Mixed-handedness"]
  const chosenStreamValues = ["Select an option", "CSE", "CSD", "ECE", "ECD", "EHD", "CHD", "CND", "CLD", "Prefer not to say"]
  const yearValues = ["Select an option", "UG1", "UG2", "UG3", "UG4", "DD5", "DD6+", "MS1", "MS2", "MS3+", "PG1", "PG2", "Prefer not to say"]
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

        <FormRow>
          <Label>Age: </Label>    <input type="number" value={userForm.age} onChange={(e) => setFormValue('age', e.target.value)} />
        </FormRow>
        <FormRow> <Label>Gender: </Label> <select onChange={(e) => setFormValue('gender', e.target.value)}>
          {genderValues.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
          {userForm.gender === Other ? <Input type="text" value={userForm.otherGender} onChange={(e) => setFormValue('otherGender', e.target.value)} /> :
            <span></span>}
        </FormRow>

        <FormRow> <Label>Handedness: </Label> <select onChange={(e) => setFormValue('handedness', e.target.value)}>
          {handednessValues.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        </FormRow>

        <FormRow> <Label>Chosen Stream: </Label> <select onChange={(e) => setFormValue('chosenStream', e.target.value)}>
          {chosenStreamValues.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        </FormRow>

        <FormRow> <Label>Current year of study: </Label> <select onChange={(e) => setFormValue('year', e.target.value)}>
          {yearValues.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        </FormRow>

        <div style={{ marginBottom: "5px" }}> <div>What is your take on creativity? What kind of creative experience do you have? </div>
          <textarea style={{ width: "100%", maxLines: "10" }} rows="4" value={userForm.creativityLAQ} onChange={(e) => setFormValue('creativityLAQ', e.target.value)} />
        </div>

        {/* What is your take on creativity? What kind of creative experience do you have? */}

        {/* Chosen stream (dropdown) */}
        {/* Year of study */}



        <SubmitButton onClick={() => {
          let ageError = false, genderError = false, errorMsg = "", handednessError = false, chosenStreamError = false, yearError = false, laqError = false
          if (userForm.age < 15 || userForm.age >= 99) {
            ageError = true
            errorMsg += "Please enter your correct age; "
          }
          if (userForm.gender === Unselected || (userForm.gender === Other && userForm.otherGender === "")) {
            genderError = true
            errorMsg += "Please enter your gender; "
          }
          if (userForm.handedness === Unselected) {
            handednessError = true
            errorMsg += "Please enter your handedness; "
          }
          if (userForm.chosenStream === Unselected) {
            chosenStreamError = true
            errorMsg += "Please enter your chosenStream; "
          }
          if (userForm.year === Unselected) {
            yearError = true
            errorMsg += "Please enter your year; "
          }
          if (userForm.creativityLAQ.length < 20) {
            laqError = true
            errorMsg += "Please enter a longer answer to the creativity question; "
          }

          if (ageError || genderError || handednessError || chosenStreamError || yearError || laqError) {
            setError(errorMsg)
          }
          else {
            editUser(uid, { demographic: userForm }).then(() => {
              changePage(getUser(state).uid, "task/start", (nextposition) => {
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
