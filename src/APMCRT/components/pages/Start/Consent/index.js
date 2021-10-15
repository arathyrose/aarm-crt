import React from "react";
import { HomeContainer, ConsentDetails, ConsentButtonApprove, MainPart, ConsentButtonDeny } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getBrowserDetails, getIPDetails } from "../../../../services/getDeviceDetails";
import { addUser } from "../../../../services/firebaseFunctions";

function Home() {
  let history = useHistory()
  return (
    <HomeContainer >
      <MainPart>
        Please read the following information carefully and click on "Yes, I agree" below if you consent to volunteer for the experiment.
        <ConsentDetails>
          <ul>
            <li> Your participation in this experiment is entirely voluntary. You can choose to withdraw from this study at any point in time. However, for the benefit of the study, please consider seeing it through till the end. </li>
            <li>Your participation will be completely anonymous. No personal identifiable information would be stored. All data kept will be purely confidential, and used only for research purposes. The data will be accessible only to those working on the project.</li>
            <li>There are no anticipated risks to the participants. </li>
            <li>You will be compensated Rs. 100 for your time. (via UPI id)</li>
            <li>After taking into account the requirements of this study, if you are ready to contribute, please give your consent by ticking on the checkbox (provided below).</li>
            <li>We are really grateful for your contribution to our research.</li>
          </ul>
        </ConsentDetails>
      </MainPart>

      <ConsentButtonApprove onClick={() => {
        // this is where the ID and other stuff is done
        getBrowserDetails().then((browserDetails) => {
          console.log(browserDetails)
          getIPDetails().then((IPDetails) => {
            console.log(IPDetails)
            console.log(window.location.pathname)
            addUser({ browserDetails, IPDetails, position:"start/" + "guidelines" }).then((uid) => {
              console.log("User ID successfully created!: ", uid)
              localStorage.setItem("token", uid)
              history.push(appBasePath + "start/" + "guidelines")
            })
          })
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
