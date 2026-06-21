import {
	CREATE_TODO_FAILURE,
	CREATE_TODO_START,
	CREATE_TODO_SUCCESS,
	DELETE_TODO_FAILURE,
	DELETE_TODO_START,
	DELETE_TODO_SUCCESS,
	GENERATE_DESCRIPTION_FAILURE,
	GENERATE_DESCRIPTION_START,
	GENERATE_DESCRIPTION_SUCCESS,
	GET_TODO_FAILURE,
	GET_TODO_START,
	GET_TODO_SUCCESS,
	UPDATE_TODO_FAILURE,
	UPDATE_TODO_START,
	UPDATE_TODO_SUCCESS,
} from "../actions/types";

const initialState = {
	todoItems: [],
	success: false,
	error: null,
	isLoading: false,
	message: null,
	aiDesc: null,
	todoCountChanged: false,
	pagination: {
		pageNumber: 1,
		pageSize: 10,
		totalPages: 1,
		totalDocuments: 0,
	},
};

export default function todo(state = initialState, action: any) {
	switch (action.type) {
		case CREATE_TODO_START:
			return {
				...state,
				isLoading: true,
			};
		case CREATE_TODO_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
				todoCountChanged: true,
			};
		case CREATE_TODO_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
				message: action.payload,
				todoCountChanged: false,
			};
		case GET_TODO_START:
			return {
				...state,
				isLoading: true,
			};
		case GET_TODO_SUCCESS:
			return {
				...state,
				isLoading: false,
				todoItems: action.payload?.data?.documents || action.payload?.todoList,
				message: action.payload?.message,
				pagination: {
					pageNumber: Number(action.payload?.data?.pageNumber) || 1,
					pageSize: Number(action.payload?.data?.pageSize) || 10,
					totalPages: Number(action.payload?.data?.totalPages) || 1,
					totalDocuments: Number(action.payload?.data?.totalDocuments) || 0,
				},
			};
		case GET_TODO_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
				message: action.payload,
			};
		case UPDATE_TODO_START:
			return {
				...state,
				isLoading: true,
			};
		case UPDATE_TODO_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
			};
		case UPDATE_TODO_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
				message: action.payload,
			};
		case DELETE_TODO_START:
			return {
				...state,
				isLoading: true,
			};
		case DELETE_TODO_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
				todoCountChanged: true,
			};
		case DELETE_TODO_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
				message: action.payload,
				todoCountChanged: false,
			};
		case GENERATE_DESCRIPTION_START:
			return {
				...state,
				isLoading: true,
			};
		case GENERATE_DESCRIPTION_SUCCESS:
			return {
				...state,
				isLoading: false,
				aiDesc: action.payload.generatedTodoDescription,
				message: "Todo description generated successfully",
			};
		case GENERATE_DESCRIPTION_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				error: action.payload,
				message: action.payload,
			};
		default:
			return state;
	}
}
