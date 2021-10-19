import React from "react";
import { PuzzleContainer, MainPart, ErrorMessage, ButtonLine, ClearButton, NextButton } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import DrawingArea from "../../../CRTDrawingArea";

function PuzzlePage() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [selectedOption, setSelectedOption] = React.useState("");
  let nunberPath = useLocation().pathname.split("/").slice(3);
  const [currentNo, setCurrentNo] = React.useState(parseInt(nunberPath) ? parseInt(nunberPath) : 1)
  const [saveImage, setSaveImage] = React.useState(false)
  const APMType = getUser(state).APMType;

  const [error, setError] = React.useState("");

  return (
    <PuzzleContainer>
      <MainPart>

        <DrawingArea saveImage={saveImage} setSaveImage={setSaveImage} />

        <ButtonLine>
          <ClearButton onClick={() => {
            setSelectedOption('')
          }} >
            Clear
          </ClearButton>
          <NextButton onClick={() => {
            setSaveImage(true)
            while (saveImage == true);
            console.log(getUser(state), "UID:", getUser(state).uid);
            let uid = getUser(state).uid;
            let nextposition = "CRT/end"
            editUser(uid, { position: nextposition }).then(() => {
              setUserDetails({ ...getUser(state), position: nextposition })(
                dispatch
              );
              history.push(appBasePath + nextposition);
              setCurrentNo(currentNo + 1)
              setSelectedOption('')
            });
          }} >
            Next
          </NextButton>
        </ButtonLine>
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : <span></span>}
      </MainPart>
    </PuzzleContainer>
  );
}
export default PuzzlePage;
