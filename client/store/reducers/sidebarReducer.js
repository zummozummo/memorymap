import { FETCH_SIDEBAR, CREATE_SIDEBAR, SET_ACTIVEID, FETCH_ACTIVEID } from "../actionTypes";

const initState = {data:[],activeId: ''};
// [{id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File'}]

const sidebarReducer = (state = initState, action) => {

	// let id = action.id || 0;
	switch (action.type) {
		case CREATE_SIDEBAR:
			state.data = (action.payload)
			console.log(state.data);
			return state
				// ...state,
				// data: [action.payload]
			// }
			case FETCH_SIDEBAR:
				return {
					// ...state,
				}
			case SET_ACTIVEID:
				let id = action.payload;
				return Object.assign({}, state, {activeId: id, data: state?.['data'] || []});
				
				// state.activeId = action.payload
				// return { ...state }
					// , data: state.data, activeId: action.payload }
			case FETCH_ACTIVEID:
				return state?.activeId || ''
			default:
			return state;
	}
}

export default sidebarReducer
