export const setProperty = (property, value) => {
  return {
    type: "SET_PROPERTY",
    property,
    value,
    segmentName: "engine",
  };
};
