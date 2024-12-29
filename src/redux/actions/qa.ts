import { Qa } from "../../utils/interfaces";
import { Api } from "../api";
import { AppDispatch } from "../reducers";
import { alertActions } from "./alert";
import {
	CREATE_QA_START,
	CREATE_QA_SUCCESS,
	CREATE_QA_FAILURE,
	GET_QA_START,
	GET_QA_SUCCESS,
	GET_QA_FAILURE,
	UPDATE_QA_START,
	UPDATE_QA_FAILURE,
	UPDATE_QA_SUCCESS,
	DELETE_QA_START,
	DELETE_QA_SUCCESS,
	DELETE_QA_FAILURE,
	GENERATE_ANSWER_START,
	GENERATE_ANSWER_SUCCESS,
	GENERATE_ANSWER_FAILURE,
} from "./types";

export const createQa =
	(body: Partial<Qa>) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: CREATE_QA_START,
			});
			const res = await Api.post("/qa/create", body);
			if (res) {
				dispatch({
					type: CREATE_QA_SUCCESS,
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
				type: CREATE_QA_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const getQa =
	(userId: string, toolId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_QA_START,
			});
			const res = await Api.get(`/qa/${userId}/${toolId}`);
			if (res) {
				dispatch({
					type: GET_QA_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GET_QA_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const updateQa =
	(qaId: string, userId: string, body: Partial<Qa>) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_QA_START,
			});
			const res = await Api.patch(`/qa/${qaId}/${userId}`, body);
			if (res) {
				dispatch({
					type: UPDATE_QA_SUCCESS,
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
				type: UPDATE_QA_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const deleteQa =
	(qaId: string, userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_QA_START,
			});
			const res = await Api.delete(`/qa/${qaId}/${userId}`);
			if (res) {
				dispatch({
					type: DELETE_QA_SUCCESS,
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
				type: DELETE_QA_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const generateAnswer =
	(question: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GENERATE_ANSWER_START,
			});
			const res = await Api.post("/qa/generate-answer", {
				question,
			});
			if (res) {
				dispatch({
					type: GENERATE_ANSWER_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GENERATE_ANSWER_FAILURE,
				payload: err?.response.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response.data?.message ||
						"Something went wrong while generating answer !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};
