import axios from "axios";
import { LOGIN } from './types';

export function loginAction(dataToSubmit) {
    const request = axios
        .post('/api/users/login', dataToSubmit);
    return {
        type: LOGIN,
        payload: request,
    };
}