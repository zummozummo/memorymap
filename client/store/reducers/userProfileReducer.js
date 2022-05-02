import { USER_UPDATE } from "../actionTypes";
import { HYDRATE } from "next-redux-wrapper";

const userProfileReducer = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        case USER_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default userProfileReducer;
