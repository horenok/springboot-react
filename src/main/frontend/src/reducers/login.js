import {LOGIN, SIGNUP} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, loginSuccess: action.payload };
            break;
        case SIGNUP:
            return { ...state, signupSuccess: action.payload };
            break;
        default:
            return state;
    }
}