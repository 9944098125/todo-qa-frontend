import {
	CREATE_QA_FAILURE,
	CREATE_QA_START,
	CREATE_QA_SUCCESS,
	DELETE_QA_FAILURE,
	DELETE_QA_START,
	DELETE_QA_SUCCESS,
	GENERATE_ANSWER_FAILURE,
	GENERATE_ANSWER_START,
	GENERATE_ANSWER_SUCCESS,
	GET_QA_FAILURE,
	GET_QA_START,
	GET_QA_SUCCESS,
	UPDATE_QA_FAILURE,
	UPDATE_QA_START,
	UPDATE_QA_SUCCESS,
} from "../actions/types";

const initialState = {
	qaItems: [],
	success: false,
	message: null,
	aiAnswer: null,
	isLoading: false,
	createdUpdatedSuccessfully: false,
};

export default function qa(state = initialState, action: any) {
	switch (action.type) {
		case CREATE_QA_START:
			return {
				...state,
				isLoading: true,
				success: false,
				createUpdatedSuccessfully: false,
			};
		case CREATE_QA_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
				createdUpdatedSuccessfully: true,
			};
		case CREATE_QA_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				message: action.payload,
				createdUpdatedSuccessfully: false,
			};
		case GET_QA_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case GET_QA_SUCCESS:
			return {
				...state,
				isLoading: false,
				message: action.payload?.message,
				qaItems: action.payload?.qa,
			};
		case GET_QA_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				message: action.payload,
			};
		case UPDATE_QA_START:
			return {
				...state,
				isLoading: true,
				success: false,
				createUpdateSuccessfully: false,
			};
		case UPDATE_QA_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
				createUpdateSuccessfully: true,
			};
		case UPDATE_QA_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				message: action.payload,
				createUpdateSuccessfully: false,
			};
		case DELETE_QA_START:
			return {
				...state,
				isLoading: true,
				success: false,
				createUpdateSuccessfully: false,
			};
		case DELETE_QA_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				message: action.payload?.message,
				createUpdateSuccessfully: true,
			};
		case DELETE_QA_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				message: action.payload,
				createUpdateSuccessfully: false,
			};
		case GENERATE_ANSWER_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case GENERATE_ANSWER_SUCCESS:
			return {
				...state,
				isLoading: false,
				aiAnswer: action.payload?.generatedAnswer,
			};
		case GENERATE_ANSWER_FAILURE:
			return {
				...state,
				isLoading: false,
				success: false,
				message: action.payload,
			};
		default:
			return state;
	}
}
