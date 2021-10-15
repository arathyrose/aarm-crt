import React from "react";
import { NavBarContainer, Nav, NavLogo, NavBtnLink } from "./styles";
import { FaQuestion } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { positionNavHeaders } from "./config"

function NavBar({ helpFunction = () => { alert("Click anywhere to continue") } }) {
  const location = useLocation();
  console.log(location)
  let currentPathName = location.pathname
  let position = positionNavHeaders["/" + currentPathName]
  if (position == undefined) position = "APM CRT Task"
  console.log(currentPathName, positionNavHeaders[currentPathName.substring(1)])

  return (
    <NavBarContainer>
      <Nav>
        <NavLogo> {positionNavHeaders[currentPathName.substring(1)] ? positionNavHeaders[currentPathName.substring(1)] : "APM CRT Task"} </NavLogo>
        <NavBtnLink onClick={helpFunction}> <FaQuestion /> </NavBtnLink>
      </Nav>
    </NavBarContainer>
  );
}
export default NavBar;
