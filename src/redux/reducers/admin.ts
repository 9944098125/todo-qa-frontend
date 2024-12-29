import {
	DELETE_QA_FOR_USER_FAILURE,
	DELETE_QA_FOR_USER_START,
	DELETE_QA_FOR_USER_SUCCESS,
	GET_QA_OF_USER_FAILURE,
	UPDATE_QA_FOR_USER_FAILURE,
	UPDATE_QA_FOR_USER_START,
	UPDATE_QA_FOR_USER_SUCCESS,
} from "./../actions/types";
import {
	CREATE_QA_FOR_USER_FAILURE,
	CREATE_QA_FOR_USER_START,
	CREATE_QA_FOR_USER_SUCCESS,
	CREATE_TODO_FOR_USER_FAILURE,
	CREATE_TODO_FOR_USER_START,
	CREATE_TODO_FOR_USER_SUCCESS,
	CREATE_USER_FAILURE,
	CREATE_USER_START,
	CREATE_USER_SUCCESS,
	DELETE_TODO_FOR_USER_FAILURE,
	DELETE_TODO_FOR_USER_START,
	DELETE_TODO_FOR_USER_SUCCESS,
	DELETE_USER_FAILURE,
	DELETE_USER_START,
	DELETE_USER_SUCCESS,
	GET_QA_OF_USER_START,
	GET_QA_OF_USER_SUCCESS,
	GET_TODO_FOR_USER_FAILURE,
	GET_TODO_FOR_USER_START,
	GET_TODO_FOR_USER_SUCCESS,
	GET_USER_FAILURE,
	GET_USER_START,
	GET_USER_SUCCESS,
	GET_USERS_FAILURE,
	GET_USERS_START,
	GET_USERS_SUCCESS,
	UPDATE_TODO_FOR_USER_FAILURE,
	UPDATE_TODO_FOR_USER_START,
	UPDATE_TODO_FOR_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
} from "../actions/types";

const initialState = {
	users: [],
	todoItems: [],
	qaItems: [],
	success: false,
	error: "",
	successMessage: "",
	isLoading: false,
	user: null,
	toggler: false,
};

export default function admin(state = initialState, action: any) {
	switch (action.type) {
		case GET_USERS_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				users: action?.payload.users,
				success: false,
			};
		case GET_USERS_FAILURE:
			return {
				...state,
				error: action.payload.message,
				success: false,
			};
		case CREATE_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case CREATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action?.payload.message,
				success: true,
				toggler: !state.toggler,
			};
		case CREATE_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload?.message,
				success: false,
			};
		case GET_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case GET_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action?.payload.user,
				success: true,
			};
		case GET_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload?.message,
				success: false,
				user: null,
			};
		case UPDATE_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
			};
		case UPDATE_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload?.message,
				success: false,
			};
		case DELETE_USER_START:
			return {
				...state,
				isLoading: true,
			};
		case DELETE_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
			};
		case DELETE_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload?.message,
				success: false,
			};
		case CREATE_TODO_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case CREATE_TODO_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
			};
		case CREATE_TODO_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				success: false,
			};
		case GET_TODO_FOR_USER_START:
			return {
				...state,
				isLoading: true,
			};
		case GET_TODO_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
				todoItems: action.payload?.todoList,
			};
		case GET_TODO_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				success: false,
			};
		case UPDATE_TODO_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case UPDATE_TODO_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
			};
		case UPDATE_TODO_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				success: false,
			};
		case DELETE_TODO_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case DELETE_TODO_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				successMessage: action.payload?.message,
				success: true,
				toggler: !state.toggler,
			};
		case DELETE_TODO_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				success: false,
			};
		case CREATE_QA_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case CREATE_QA_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				successMessage: action.payload?.message,
				toggler: !state.toggler,
			};
		case CREATE_QA_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
			};
		case GET_QA_OF_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case GET_QA_OF_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				qaItems: action.payload?.qas,
				successMessage: action.payload?.message,
			};
		case GET_QA_OF_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				qaItems: [],
				error: action.payload,
			};
		case UPDATE_QA_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case UPDATE_QA_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				successMessage: action.payload?.message,
				toggler: !state.toggler,
			};
		case UPDATE_QA_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
			};
		case DELETE_QA_FOR_USER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case DELETE_QA_FOR_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				successMessage: action.payload?.message,
				toggler: !state.toggler,
			};
		case DELETE_QA_FOR_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
