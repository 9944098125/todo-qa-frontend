import { SEARCH } from "../actions/types";

const initialState = {
	filteredItems: [],
};

export default function search(state = initialState, action: any) {
	switch (action.type) {
		case SEARCH:
			console.log("action.payload", action.payload);
			return {
				...state,
				filteredItems: action.payload,
			};
		default:
			return state;
	}
}
