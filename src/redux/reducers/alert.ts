import {
	SUCCESS,
	ERROR,
	SUCCESS_CLEAR,
	ERROR_CLEAR,
	CLEAR,
} from "../actions/types";

export function alert(state = {}, action: any) {
	switch (action.type) {
		case SUCCESS:
			return {
				type: "success",
				message: action.message,
			};
		case ERROR:
			return {
				type: "error",
				message: action.message,
			};
		case SUCCESS_CLEAR:
			return {
				type: "success_clear",
				message: "",
			};
		case ERROR_CLEAR:
			return {
				type: "error_clear",
				message: "",
			};
		case CLEAR:
			return {
				type: "clear",
				message: "",
			};
		default:
			return state;
	}
}
