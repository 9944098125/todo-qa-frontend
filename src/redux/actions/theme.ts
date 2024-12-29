import { AppDispatch } from "../reducers";
import { TOGGLE_THEME } from "./types";

export const toggleTheme = () => (dispatch: AppDispatch) => {
	dispatch({
		type: TOGGLE_THEME,
	});
};
