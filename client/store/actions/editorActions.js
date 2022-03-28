import { apiWrapper } from "../../helpers/apiWrapper";
import { FETCH_EDITOR, SAVE_EDITOR, CREATE_SIDEBAR, UPDATE_EDITOR } from "../actionTypes";


export const saveEditor = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({ type: SAVE_EDITOR, payload: data })
}

export const fetchEditor = (id) => (dispatch) => {
  // console.log(
     dispatch({ type: FETCH_EDITOR })
    // );
  
}

export const updateEditor = (data) => async (dispatch) => {
  // console.log(data);
  dispatch({ type: UPDATE_EDITOR, payload: data })
}