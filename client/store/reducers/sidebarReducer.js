import { getCookie } from "../actions/authActions";
import { FETCH_SIDEBAR, CREATE_SIDEBAR, UPDATE_SIDEBAR, SET_ACTIVEID, FETCH_ACTIVEID, SET_AUTHID } from "../actionTypes";

const initState = {
	data: {parent: 'global', id: typeof window !== 'undefined' ? localStorage.getItem('token') : null, items:[]}, 
	activeId: {}
};
// [{id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File'}]

const sidebarReducer = (state = initState, action) => {

	// let id = action.id || 0;
	switch (action.type) {
		case CREATE_SIDEBAR:
			// console.log(state, action.payload);
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
				// state.data newBlock, newBlockParent
				// console.log("state", state);
				// return Object.assign({}, state, {
				// 	data: Object.assign({}, state.data, {
				// 	  items: Object.assign({}, state.data.items, {
				// 		...action.payload.items
				// 	  })
				// 	})
				//   });
				// return Object.assign({}, state, {
				// 	data: Object.assign({}, state.data, action.payload)
				//   });
				return {...state, 
					data: action.payload}
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
