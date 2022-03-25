import { apiWrapper } from "../../helpers/apiWrapper";
import { FETCH_SIDEBAR, SAVE_SIDEBAR, CREATE_SIDEBAR, UPDATE_SIDEBAR, SET_ACTIVEID, FETCH_ACTIVEID } from "../actionTypes";



export const createsideBar = (data) => (dispatch) => {
    // console.log(data);
    dispatch({ type: CREATE_SIDEBAR, payload: data });
}

export const updateSideBar = (id, data) => (dispatch) => {
    console.log(data);
    dispatch({ type: UPDATE_SIDEBAR, payload: {id, data} });
}

export const setactiveId = (data) => (dispatch) => {
    dispatch({ type: SET_ACTIVEID, payload: data });
}

export const getSidebarId = (data) => async (dispatch) => {
    // console.log(data);
}

export const fetchactiveId = (data) => (dispatch) => {
    dispatch({ type: FETCH_ACTIVEID });
}