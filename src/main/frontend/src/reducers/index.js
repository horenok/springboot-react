import { combineReducers } from "redux";
import user from './login';

//여러개의 reducer를 하나로 합침
const rootReducer = combineReducers({
    user
});

export default rootReducer;