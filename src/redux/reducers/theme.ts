import { TOGGLE_THEME } from "../actions/types";

const initialState = {
	dark: false,
};

export default function theme(state = initialState, action: any) {
	switch (action.type) {
		case TOGGLE_THEME:
			return {
				...state,
				dark: !state.dark,
			};
		default:
			return state;
	}
}
