import createReducer from "../common/createReducer";

var reducers = {
    SET_USER_DETAILS: (state, action) => {
        return action.userDetails;
    },
    UPDATE_USER_PREFERENCE: (state, action) => {
        return {
            ...state,
            preference: {
                ...state.preference,
                ...action.updates
            }
        }
    },
    LOGOUT: (state, action) => {
        document.cookie = "";
        localStorage.removeItem("token");
        return {
            role: "unauthorised",
        };
    },
};

const initialState = {
    
};

export default createReducer(initialState, reducers);