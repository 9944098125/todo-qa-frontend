import { SUCCESS, ERROR, SUCCESS_CLEAR, ERROR_CLEAR, CLEAR } from "./types";

export const alertActions = {
	success,
	error,
	success_clear,
	error_clear,
	clear,
};

//success alert
function success(message: string) {
	return { type: SUCCESS, message };
}

//error alert
function error(message: string) {
	return { type: ERROR, message };
}

//success clear alert
function success_clear() {
	return { type: SUCCESS_CLEAR };
}

//success error alert
function error_clear() {
	return { type: ERROR_CLEAR };
}

//to clear all alert
function clear() {
	return { type: CLEAR };
}
