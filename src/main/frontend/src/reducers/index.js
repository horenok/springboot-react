import { combineReducers } from "redux";
import login from './login';

//여러개의 reducer를 하나로 합침
const rootReducer = combineReducers({
    login
});

export default rootReducer;