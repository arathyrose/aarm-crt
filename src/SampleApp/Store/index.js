/*
THIS FILE NEED NOT BE TOUCHED.
To add a segment, create segment folder and add details to storeList
*/
import React, { createContext, useReducer } from "react";
import storeList from "./storeList";
function getCombinedInitialState() {
  let combinedInitialState = {};
  Object.keys(storeList).forEach((storeSegmentName) => {
    combinedInitialState[storeSegmentName] = storeList[storeSegmentName].store;
  });
  return combinedInitialState;
}
function getCombinedReducer() {
  let combinedReducer = (state, action) => {
    return {
      ...state,
      [action.segmentName]: storeList[action.segmentName].reducer(
        state[action.segmentName],
        action
      ),
    };
  };
  return combinedReducer;
}
export const Context = createContext(getCombinedInitialState());
export const Provider = (props) => {
  const [state, dispatch] = useReducer(
    getCombinedReducer(),
    getCombinedInitialState()
  );
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
