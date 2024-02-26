import axios from "axios";
import {EMAILDUPLICATE, SIGNUP} from './types';

export function onSignUp(dataToSubmit) {
    const request = axios
        .post('/api/users/signup', dataToSubmit, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.data);
    return {
        type: SIGNUP,
        payload: true,
    };
}

export async function emailDuplicateCheck(email) {
    try {
        const res = await axios.post('/api/users/emailDuplicate', email, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(res.data.code == "0000") {
            return {
                type: EMAILDUPLICATE,
                payload: true,
            };
        } else {
            return {
                type: EMAILDUPLICATE,
                payload: false,
            };
        }
    } catch (err) {
        console.error('Error checking email duplication:', err);
        return {
            type: EMAILDUPLICATE,
            payload: false,
        };
    }
}
