import { AppDispatch } from "../reducers";
import { CHANGE_SUCCESS } from "./types";

export const changeSuccess = () => (dispatch: AppDispatch) => {
	dispatch({
		type: CHANGE_SUCCESS,
	});
};
