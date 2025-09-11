import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import GamesDataReducer from "./GamesDataReducer";

const rootReducer = combineReducers({
  UserReducer,
  GamesDataReducer,
});

export default rootReducer;
