import { CHANGE_SUCCESS } from "../actions/types";

const initialState = {
	success: true,
};

export default function successReducer(state = initialState, action: any) {
	switch (action.type) {
		case CHANGE_SUCCESS:
			return {
				success: false,
			};
		default:
			return state;
	}
}
