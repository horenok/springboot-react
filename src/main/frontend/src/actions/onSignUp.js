import axios from "axios";
import { SIGNUP } from './types';

export function onSignUp() {
    return {
        type: SIGNUP,
        payload: true,
    };
}