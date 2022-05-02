import { apiWrapper } from "../../helpers/apiWrapper";
import { USER_UPDATE } from "../actionTypes";


export const userProfile = (data) => {
    return async function (dispatch, getState) {
        dispatch({
            type: USER_UPDATE,
            payload: data
        })
        return true;
    }
}