import React from "react";
import { PuzzleContainer, MainPart, ButtonLine, NextButton } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import DrawingArea from "../../../CRTDrawingArea";
import { changePage } from "../../../../services/logging";

function PuzzlePage() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [saveImage, setSaveImage] = React.useState(false)
  return (
    <PuzzleContainer>
      <MainPart>
        <DrawingArea saveImage={saveImage} setSaveImage={setSaveImage} />
        <ButtonLine>
          <NextButton onClick={() => {
            setSaveImage(true)
            while (saveImage === true);
            changePage(getUser(state).uid, "CRT/end", (nextposition) => {
              setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
              history.push(appBasePath + nextposition)
            })
          }} >
            Next
          </NextButton>
        </ButtonLine>
      </MainPart>
    </PuzzleContainer>
  );
}
export default PuzzlePage;
