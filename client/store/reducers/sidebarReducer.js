import { FETCH_SIDEBAR, SAVE_SIDEBAR } from "../actionTypes";

const sidebarReducer = (state = { sidebarData: null }, action) => {
	switch (action.type) {
		case SAVE_SIDEBAR:
			return {
				...state,
				...action.payload
			}
			case FETCH_SIDEBAR:
				return {
					// ...state,
					// ...action.payload
				}
			default:
			return state;
	}
}

export default sidebarReducer
