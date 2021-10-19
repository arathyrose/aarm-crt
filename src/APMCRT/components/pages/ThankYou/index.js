import React from "react";
import { ThankYouContainer, AppTitle, SmallText } from "./styles";
import { getUser } from "../../../Store/user/accessors";
import { Context } from "../../../Store";

function ThankYou() {
  const { state } = React.useContext(Context);
  const uid = getUser(state).uid
  return (
    <ThankYouContainer>
      {/*  <AppLogo src={LogoImage} /> */}
      <AppTitle>THANK YOU</AppTitle>
      <SmallText>You can attempt this experiment only once. Please close this window if done.</SmallText>
      <SmallText>Your UID is {uid}.</SmallText>
    </ThankYouContainer>
  );
}
export default ThankYou;
