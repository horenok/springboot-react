import axios from "axios";
import {POSTS} from './types';

export function postAction() {
    const request = axios
        .get('/api/backing/getlist');
    return {
        type: POSTS,
        payload: request,
    };
}