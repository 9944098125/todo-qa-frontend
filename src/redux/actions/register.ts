import { RegisterProps } from "../../utils/interfaces";
import { Api } from "../api";
import { AppDispatch } from "../reducers";
import { alertActions } from "./alert";
import { REGISTER_FAILURE, REGISTER_START, REGISTER_SUCCESS } from "./types";

export const register =
	(body: RegisterProps) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: REGISTER_START,
			});
			const res = await Api.post("/auth/register", body);
			if (res) {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				});
				dispatch(alertActions.success(res?.data?.message));
				setTimeout(() => {
					dispatch(alertActions.success_clear());
					dispatch(alertActions.clear());
				}, 3000);
			}
		} catch (err: any) {
			dispatch({
				type: REGISTER_FAILURE,
				payload: err?.response?.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response?.data?.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};
