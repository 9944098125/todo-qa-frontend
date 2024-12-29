import { Api } from "../api";
import { AppDispatch } from "../reducers";
import { alertActions } from "./alert";
import {
	DELETE_PROFILE_FAILURE,
	DELETE_PROFILE_START,
	DELETE_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	GET_PROFILE_START,
	GET_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_START,
	UPDATE_PROFILE_SUCCESS,
} from "./types";

export const getProfile = (userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch({
			type: GET_PROFILE_START,
		});
		const res = await Api.get(`/auth/${userId}`);
		if (res) {
			dispatch({
				type: GET_PROFILE_SUCCESS,
				payload: res.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_PROFILE_FAILURE,
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

export const updateProfile =
	(body: any, userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_PROFILE_START,
			});
			const res = await Api.patch(`/auth/${userId}`, body);
			if (res) {
				dispatch({
					type: UPDATE_PROFILE_SUCCESS,
					payload: res.data,
				});
				dispatch(
					alertActions.success(
						res?.data?.message || "Successfully updated the Profile !"
					)
				);
				setTimeout(() => {
					dispatch(alertActions.success_clear());
					dispatch(alertActions.clear());
				}, 3000);
			}
		} catch (err: any) {
			dispatch({
				type: UPDATE_PROFILE_FAILURE,
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

export const deleteProfile =
	(userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_PROFILE_START,
			});
			const res = await Api.delete(`/auth/${userId}/delete`);
			if (res) {
				dispatch({
					type: DELETE_PROFILE_SUCCESS,
					payload: res.data.message,
				});
				dispatch(
					alertActions.success(
						res?.data?.message || "Deleted your Profile Successfully !"
					)
				);
				setTimeout(() => {
					dispatch(alertActions.success_clear());
					dispatch(alertActions.clear());
				}, 3000);
			}
		} catch (err: any) {
			dispatch({
				type: DELETE_PROFILE_FAILURE,
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
