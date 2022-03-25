import { combineReducers } from "redux";
import authReducer from "./authReducer";
import editorReducer from "./editorReducer";
import sidebarReducer from "./sidebarReducer";


  
  // Clear all data in redux store to initial.

  
const defaultSidebar = {
	data: {parent: 'global', id: typeof window !== 'undefined' ? localStorage.getItem('token') || getCookie('token') : '', items:[]}, 
	activeId: {}
};
  
const defaultAuth = { token: null, isSignedin: false, isLoggedin: false }
  
const defaultEditor = { data: [] };

  const appReducer = combineReducers({
    authentication: authReducer,
  sidebar: sidebarReducer,
  editor: editorReducer
  });
  
  const rootReducer = (state, action) => {
    // console.log(action, action.type == 'DESTROY_SESSION');
    if (action.type == 'DESTROY_SESSION') {
      // console.log("s", state);
      state = {authentication: defaultAuth, sidebar: defaultSidebar, editor: defaultEditor};
    }
  console.log(state);
    return appReducer(state, action);
  };
  export default rootReducer;
