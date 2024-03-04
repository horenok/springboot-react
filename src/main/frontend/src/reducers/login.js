import {EMAILDUPLICATE, LOGIN, LOGOUT, SIGNUP} from "../actions/types";

export default function (state = {}, action) {

    const initialState = {
        isLoggedIn: false,
    }

    switch (action.type) {
        case LOGIN:
            return { ...state, loginSuccess: action.payload, isLoggedIn: true };
            break;
        case LOGOUT:
            return { ...state, logoutSuccess: action.payload, isLoggedIn: false };
            break;
        case SIGNUP:
            return { ...state, signupSuccess: action.payload };
            break;
        case EMAILDUPLICATE:
            return { ...state, emailDuplicate: action.payload };
            break;
        default:
            return {
                ...state,
            };
    }
}