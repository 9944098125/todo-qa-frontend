import {
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_START,
	GET_USER_DETAILS_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGOUT,
	UPDATE_PASSWORD_FAILURE,
	UPDATE_PASSWORD_START,
	UPDATE_PASSWORD_SUCCESS,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("asp-todo-qa-token") || "",
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
	message: null,
	updateSuccess: false,
};

export default function login(state = initialState, action: any) {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				isLoading: true,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("asp-todo-qa-token", action?.payload?.token);
			localStorage.setItem(
				"asp-todo-qa-user",
				JSON.stringify(action?.payload?.user)
			);
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				token: action?.payload?.token,
				user: action?.payload?.user,
				error: null,
				message: action?.payload?.message,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				token: null,
				user: null,
				error: action?.payload,
				message: action?.payload,
			};
		case LOGOUT:
			localStorage.removeItem("asp-todo-qa-token");
			localStorage.removeItem("asp-todo-qa-user");
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
				token: null,
				user: null,
				error: null,
				message: null,
			};
		case GET_USER_DETAILS_START:
			return {
				...state,
				isLoading: true,
			};
		case GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action?.payload.user,
				error: null,
				message: action?.payload,
			};
		case GET_USER_DETAILS_FAILURE:
			return {
				...state,
				isLoading: false,
				user: null,
				error: action?.payload,
				message: action?.payload,
			};
		case UPDATE_PASSWORD_START:
			return {
				...state,
				isLoading: true,
				updateSuccess: false,
			};
		case UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				updateSuccess: true,
				message: action.payload?.message,
			};
		case UPDATE_PASSWORD_FAILURE:
			return {
				...state,
				isLoading: false,
				updateSuccess: false,
				message: action.payload,
			};
		default:
			return state;
	}
}
