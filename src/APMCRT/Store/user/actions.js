export const setUserDetails = (userDetails) => {
    return (dispatch) => {
        dispatch({
            type: "SET_USER_DETAILS",
            userDetails,
            segmentName: "user",
        });
    };
};
export const updateTransformers = (transformers) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_TRASNFORMERS",
            transformers,
            segmentName: "user",
        });
    };
};
export const updateUserPreference = (updates) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_USER_PREFERENCE",
            updates,
            segmentName: "user",
        });
    };
};
export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
            segmentName: "user",
        });
    };
};