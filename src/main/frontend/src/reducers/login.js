import {LOGIN} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, loginSuccess: action.payload };
            break;
        default:
            return state;
    }
}