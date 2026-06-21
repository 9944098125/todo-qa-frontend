import { CLEAR_SEARCH, SEARCH } from "../actions/types";

const initialState = {
	filteredItems: [] as any[],
	query: "",
};

export default function search(state = initialState, action: any) {
	switch (action.type) {
		case SEARCH:
			return {
				...state,
				filteredItems: action.payload.items,
				query: action.payload.query,
			};
		case CLEAR_SEARCH:
			return {
				...state,
				filteredItems: [],
				query: "",
			};
		default:
			return state;
	}
}
