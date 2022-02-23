import { fetchWrapper } from "../../helpers/fetchWrapper";
import { FETCH_EDITOR, SAVE_EDITOR } from "../actionTypes";


export const handleData = (data) => (dispatch) =>
 fetchWrapper.post(`/api/blocks`, data)
 .then((data) => data.json())
  .then((response) => {
    dispatch({ type: SAVE_SIDEBAR, payload: response });
  })
  .catch((err) => console.log(err));

