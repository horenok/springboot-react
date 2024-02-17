import axios from "axios";
import { LOGIN } from './types';

export function loginAction(dataToSubmit) {
    /*const request = axios
        .post('/api/users/login', dataToSubmit)
        .then((res) => res.data);*/
    return {
        type: LOGIN,
        payload: true,
    };
}