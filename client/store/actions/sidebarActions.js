import { apiWrapper } from "../../helpers/apiWrapper";
import { FETCH_SIDEBAR, SAVE_SIDEBAR, CREATE_SIDEBAR, SET_ACTIVEID } from "../actionTypes";



export const createsideBar = (data) => (dispatch) => {
    dispatch({ type: CREATE_SIDEBAR, payload: data });
}


export const setactiveId = (data) => (dispatch) => {
    dispatch({ type: SET_ACTIVEID, payload: data });
}