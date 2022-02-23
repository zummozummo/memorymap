import { combineReducers } from "redux";
import authReducer from "./authReducer";
import editorReducer from "./editorReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
  authentication: authReducer,
  sidebar: sidebarReducer,
  editor: editorReducer
});

export default rootReducer;
  
