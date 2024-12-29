import { AppDispatch } from "../reducers";
import { TOGGLE_SIDEBAR } from "./types";

export const sidebar = () => (dispatch: AppDispatch) => {
	dispatch({
		type: TOGGLE_SIDEBAR,
	});
};
