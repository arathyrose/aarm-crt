import React from "react";
import { HomeContainer, ConsentDetails, ConsentButtonApprove, MainPart, ConsentButtonDeny } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";
import { getUser } from "../../../../Store/user/accessors";

function Home() {
  let history = useHistory()
  const { state, dispatch } = React.useContext(Context);
  return (
    <HomeContainer >
      <MainPart>
        Please read the following information carefully and click on "Yes, I agree" below if you consent to volunteer for the experiment.
        <ConsentDetails>
          <ul>
            <li> Your participation in this experiment is entirely voluntary. You can choose to withdraw from this study at any point in time. However, for the benefit of the study, please consider seeing it through till the end. </li>
            <li>Your participation will be completely anonymous. No personal identifiable information would be stored. All data kept will be purely confidential, and used only for research purposes. </li>
            <li>There are no anticipated risks to the participants. </li>
            <li>You will be compensated Rs. 100 for your time. (via UPI id)</li>
            <li>After taking into account the requirements of this study, if you are ready to contribute, please give your consent by ticking on the checkbox (provided below).</li>
            <li>We are really grateful for your contribution to our research.</li>
          </ul>
        </ConsentDetails>
      </MainPart>

      <ConsentButtonApprove onClick={() => {
        changePage(getUser(state).uid, "start/guidelines", (nextposition) => {
          setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
          history.push(appBasePath + nextposition)
        })
      }}>
        I have read the aforementioned information carefully. Any questions pertaining to this experiment have been answered to my best satisfaction. I hereby voluntarily agree to participate in this project.
      </ConsentButtonApprove>

      <ConsentButtonDeny onClick={() => { window.location.href = "https://google.com" }}>
        I do not wish to take part in this experiment
      </ConsentButtonDeny>

    </HomeContainer>
  );
}
export default Home;
