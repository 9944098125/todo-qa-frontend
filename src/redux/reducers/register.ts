import {
	REGISTER_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
	isLoading: false,
	error: null,
	message: null,
	success: null,
};

export default function register(state = initialState, action: any) {
	switch (action.type) {
		case REGISTER_START:
			return {
				...state,
				isLoading: true,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action?.payload?.message,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action?.payload,
				success: false,
				message: action?.payload,
			};
		default:
			return state;
	}
}
