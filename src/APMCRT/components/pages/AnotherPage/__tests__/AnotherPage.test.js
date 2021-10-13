import AnotherPage from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("AnotherPage", () => {
  it("should render correctly", () => {
    let AnotherPageSnapshot = shallow(<AnotherPage/>);
    expect(AnotherPageSnapshot).toMatchSnapshot();
  });
});