import { AppDispatch } from "../reducers";
import { SEARCH } from "./types";

export const searchItems = (items: any[]) => async (dispatch: AppDispatch) => {
	dispatch({
		type: SEARCH,
		payload: items,
	});
	// console.log(items);
};
