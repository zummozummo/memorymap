import { FETCH_SIDEBAR, CREATE_SIDEBAR, SET_ACTIVEID } from "../actionTypes";

const initState = {data:[],activeId: ''};
// [{id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File'}]

const sidebarReducer = (state = initState, action) => {
	// console.log(action);

	// let id = action.id || 0;
	// console.log(action.payload);
	switch (action.type) {
		case CREATE_SIDEBAR:
	state?.data?.push(action.payload)
			return state
				// ...state,
				// data: [action.payload]
			// }
			case FETCH_SIDEBAR:
				return {
					// ...state,
				}
			case SET_ACTIVEID:
				state.activeId = action.payload
				return state
			default:
			return state;
	}
}

export default sidebarReducer
