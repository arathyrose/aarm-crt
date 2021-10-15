import NavBar from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("NavBar", () => {
  it("should render correctly", () => {
    let NavBarSnapshot = shallow(<NavBar/>);
    expect(NavBarSnapshot).toMatchSnapshot();
  });
});