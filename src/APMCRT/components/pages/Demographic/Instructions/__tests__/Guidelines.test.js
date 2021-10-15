import Guidelines from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("Guidelines", () => {
  it("should render correctly", () => {
    let GuidelinesSnapshot = shallow(<Guidelines />);
    expect(GuidelinesSnapshot).toMatchSnapshot();
  });
});