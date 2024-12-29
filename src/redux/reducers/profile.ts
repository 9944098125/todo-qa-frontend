import {
	DELETE_PROFILE_FAILURE,
	DELETE_PROFILE_START,
	DELETE_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	GET_PROFILE_START,
	GET_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_START,
	UPDATE_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
	isLoading: false,
	error: null,
	success: false,
	profile: null,
	message: null,
	toggler: false,
};

export default function profile(state = initialState, action: any) {
	switch (action.type) {
		case GET_PROFILE_START:
			return {
				...state,
				isLoading: true,
			};
		case GET_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				profile: action?.payload,
			};
		case GET_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action?.payload,
			};
		case UPDATE_PROFILE_START:
			return {
				...state,
				isLoading: true,
			};
		case UPDATE_PROFILE_SUCCESS:
			localStorage.setItem(
				"asp-todo-qa-user",
				JSON.stringify(action?.payload?.user)
			);
			return {
				...state,
				isLoading: false,
				success: true,
				message: action?.payload.message,
				toggler: !state.toggler,
				profile: action?.payload.user,
			};
		case UPDATE_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action?.payload,
			};
		case DELETE_PROFILE_START:
			return {
				...state,
				isLoading: true,
			};
		case DELETE_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action?.payload,
				toggler: !state.toggler,
			};
		case DELETE_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action?.payload,
				success: false,
			};
		default:
			return state;
	}
}
