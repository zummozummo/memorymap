import { apiWrapper } from "../../helpers/apiWrapper";

import { FETCH_SIDEBAR, SAVE_SIDEBAR, CREATE_SIDEBAR, UPDATE_SIDEBAR, SET_ACTIVEID, FETCH_ACTIVEID, SET_AUTHID } from "../actionTypes";



export const createsideBar = (data) => (dispatch) => {
    dispatch({ type: CREATE_SIDEBAR, payload: data });
}

export const updateSideBar = (newList) => (dispatch) => {
    dispatch({ type: UPDATE_SIDEBAR, payload: newList });
}

export const setactiveId = (data) => (dispatch) => {
    dispatch({ type: SET_ACTIVEID, payload: data });
}

export const getSidebarId = (data) => async (dispatch) => {
}

export const fetchactiveId = (data) => (dispatch) => {
    dispatch({ type: FETCH_ACTIVEID });
}
export const setAuthId = (data) => (dispatch) => {
    dispatch({ type: SET_AUTHID, payload: data });
}
