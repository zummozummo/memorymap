import { FETCH_SIDEBAR, CREATE_SIDEBAR, SET_ACTIVEID } from "../actionTypes";

const initState = {data:[],activeId: ''};
// [{id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File'}]

const sidebarReducer = (state = initState, action) => {
	// let id = action.id || 0;
	// console.log(state, action);
	switch (action.type) {
		case CREATE_SIDEBAR:
			return {
				...state,
				data: [action.payload]
			}
			case FETCH_SIDEBAR:
				return {
					// ...state,
				}
			case SET_ACTIVEID:
				return {
					...state,
					activeId: action.payload
				}

			default:
			return state;
	}
}

export default sidebarReducer
