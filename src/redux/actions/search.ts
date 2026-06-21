import { AppDispatch } from "../reducers";
import { CLEAR_SEARCH, SEARCH } from "./types";

export const searchItems =
	(items: any[], query: string) => async (dispatch: AppDispatch) => {
		dispatch({
			type: SEARCH,
			payload: { items, query },
		});
	};

export const clearSearch = () => async (dispatch: AppDispatch) => {
	dispatch({ type: CLEAR_SEARCH });
};
