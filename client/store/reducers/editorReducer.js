import { FETCH_EDITOR, SAVE_EDITOR, UPDATE_EDITOR } from "../actionTypes";

const editorReducer = (state = { data: [] }, action) => {
	// console.log("editorReducer", state, action);
	switch (action.type) {
		case SAVE_EDITOR:
			return {
				...state,
				data: [action.payload]
			}
			case FETCH_EDITOR:
				return {
					...state.data
				}
			case UPDATE_EDITOR:
				// console.log(action.payload);
				return {
					...state.data
				}
			default:
			return state;
	}
}

export default editorReducer;
