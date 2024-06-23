import { combineReducers } from "redux";
import reducers from './reducers';

//여러개의 reducer를 하나로 합침
const rootReducer = combineReducers({
    reducers
});

export default rootReducer;