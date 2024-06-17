import axios from "axios";
import {LOGIN, LOGOUT} from './types';

export function loginAction(dataToSubmit) {
    const request = axios
        .post('/api/users/login', dataToSubmit);
    return {
        type: LOGIN,
        payload: request,
    };
}

export function logoutAction() {
    const request = axios
        .post('/api/users/logout');
    return {
        type: LOGOUT,
        payload: request,
    };
}