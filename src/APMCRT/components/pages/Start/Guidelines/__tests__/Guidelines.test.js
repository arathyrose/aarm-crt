import Home from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("Home", () => {
  it("should render correctly", () => {
    let HomeSnapshot = shallow(<Home/>);
    expect(HomeSnapshot).toMatchSnapshot();
  });
});