import axios from "axios";
import { LoginPayload } from "../../utils/interfaces";
import { Api } from "../api";
import { AppDispatch } from "../reducers";
import { alertActions } from "./alert";
import {
	GET_USER_DETAILS_FAILURE,
	GET_USER_DETAILS_START,
	GET_USER_DETAILS_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGOUT,
	UPDATE_PASSWORD_FAILURE,
	UPDATE_PASSWORD_START,
	UPDATE_PASSWORD_SUCCESS,
} from "./types";

export const login =
	(requestBody: LoginPayload) => async (dispatch: AppDispatch) => {
		dispatch({
			type: LOGIN_START,
		});
		try {
			const response = await Api.post("/auth/login", requestBody);
			if (response) {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: response?.data,
				});
				console.log("res", response);
			}
		} catch (err: any) {
			dispatch({
				type: LOGIN_FAILURE,
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

export const logout = () => (dispatch: AppDispatch) => {
	dispatch({
		type: LOGOUT,
	});
};

export const getUserDetails = () => async (dispatch: AppDispatch) => {
	try {
		dispatch({
			type: GET_USER_DETAILS_START,
		});
		const res = await axios.get(
			"https://todo-qa-with-ts-backend-production.up.railway.app/login/success"
		);
		if (res) {
			dispatch({
				type: GET_USER_DETAILS_SUCCESS,
				payload: res?.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_USER_DETAILS_FAILURE,
			payload: err?.response.data?.message,
		});
	}
};

export const updatePassword =
	(userId: string, body: any) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_PASSWORD_START,
			});
			const res = await Api.patch(`/auth/${userId}/updatePassword`, body);
			if (res) {
				dispatch({
					type: UPDATE_PASSWORD_SUCCESS,
					payload: res?.data,
				});
				dispatch(alertActions.success(res?.data?.message));
				setTimeout(() => {
					dispatch(alertActions.success_clear());
					dispatch(alertActions.clear());
				}, 3000);
			}
		} catch (err: any) {
			dispatch({
				type: UPDATE_PASSWORD_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data?.message ||
						"Something went wrong while updating password"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};
