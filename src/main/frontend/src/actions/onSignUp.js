import axios from "axios";
import {SIGNUP} from './types';

export function onSignUp(dataToSubmit) {
    const request = axios
        .post('/api/users/signup', dataToSubmit)
        .then((res) => res.data);
    return {
        type: SIGNUP,
        payload: true,
    };
}