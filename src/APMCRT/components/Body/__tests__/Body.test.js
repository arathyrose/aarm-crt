import Body from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("Body", () => {
  it("should render correctly", () => {
    let BodySnapshot = shallow(<Body/>);
    expect(BodySnapshot).toMatchSnapshot();
  });
});