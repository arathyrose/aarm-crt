import styled from "styled-components";
import colors from "../../config/colors";

export const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

export const Nav = styled.div`
  background: ${colors.primary};
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  padding-left: 5%;
  padding-right: 5%;
  z-index: 12;
`;

export const NavLogo = styled.div`
  cursor: pointer;
  color: ${colors.navbarTitle};
  font-size: 1.4em;
  text-decoration: none;
`;

export const NavBtnLink = styled.div`
  border-radius: 10px;
  background: transparent;
  padding: 10px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
