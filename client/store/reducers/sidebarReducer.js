import { getCookie } from "../actions/authActions";
import { FETCH_SIDEBAR, CREATE_SIDEBAR, UPDATE_SIDEBAR, SET_ACTIVEID, FETCH_ACTIVEID, SET_AUTHID } from "../actionTypes";

const initState = {
	data: {parent: 'global', id: typeof window !== 'undefined' ? localStorage.getItem('token') || getCookie('token') : 'dd', items:[]}, 
	activeId: {}
};
// [{id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File'}]

const sidebarReducer = (state = initState, action) => {

	// let id = action.id || 0;
	switch (action.type) {
		case CREATE_SIDEBAR:
			console.log(state, action.payload);
			// const newobj = {
			// 	...state,
			// 	data: {
			// 		...state.data,
			// 		items: [
			// 			...state.data.items, action.payload
			// 		]
			// 	}
			// }
			// console.log(newobj);
			return {
				...state,
				data: {
					...state.data,
					items: [
						...state.data.items, action.payload
					]
				}
			}
			case UPDATE_SIDEBAR:
				console.log(action);
				// state.data
				console.log("state", state);
				
				
				return state
			case FETCH_SIDEBAR:
				return {
					// ...state,
				}
			case SET_ACTIVEID:
				let obj = action.payload;
				return Object.assign({}, state, {activeId: obj, data: state?.['data']});
				
				// state.activeId = action.payload
				// return { ...state }
					// , data: state.data, activeId: action.payload }
			case FETCH_ACTIVEID:
				return state?.activeId || ''
			case SET_AUTHID:
				let id = action.payload;
				return {
					...state,
					data: {
						...state.data,
						id: id
					}
				}
			
			default:
			return state;
	}
}

export default sidebarReducer
