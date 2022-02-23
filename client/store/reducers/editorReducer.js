import { FETCH_EDITOR, SAVE_EDITOR } from "../actionTypes";

const editorReducer = (state = { data: null }, action) => {
	switch (action.type) {
		case SAVE_EDITOR:
			return {
				...state,
				...action.payload
			}
			case FETCH_EDITOR:
				return {
					// ...state,
					// ...action.payload
				}
			default:
			return state;
	}
}

export default editorReducer;
