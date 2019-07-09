// import keyreducer from "./keyreducer";
// import dropdownreducer from "./dropdownreducer";
import rowReducer from "./rowreducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  row: rowReducer,
});

export default reducers;
