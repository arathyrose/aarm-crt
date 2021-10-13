import SampleApp from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("SampleApp", () => {
  it("should render correctly", () => {
    let SampleAppSnapshot = shallow(<SampleApp/>);
    expect(SampleAppSnapshot).toMatchSnapshot();
  });
});