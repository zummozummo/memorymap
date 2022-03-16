import { apiWrapper } from "../../helpers/apiWrapper";
import { FETCH_SIDEBAR, SAVE_SIDEBAR, CREATE_SIDEBAR, SET_ACTIVEID } from "../actionTypes";



export const createsideBar = (data) => (dispatch) => {
    // console.log(data);
    dispatch({ type: CREATE_SIDEBAR, payload: data });
}


export const setactiveId = (data) => (dispatch) => {
    dispatch({ type: SET_ACTIVEID, payload: data });
}

export const getSidebarId = (data) => async (dispatch) => {
    // console.log(data);
}