import { Todo } from "../../utils/interfaces";
import { Api } from "../api";
import { AppDispatch } from "../reducers";
import { alertActions } from "./alert";
import {
	CREATE_TODO_FAILURE,
	CREATE_TODO_START,
	CREATE_TODO_SUCCESS,
	DELETE_TODO_FAILURE,
	DELETE_TODO_START,
	DELETE_TODO_SUCCESS,
	GENERATE_DESCRIPTION_FAILURE,
	GENERATE_DESCRIPTION_START,
	GENERATE_DESCRIPTION_SUCCESS,
	GET_TODO_FAILURE,
	GET_TODO_START,
	GET_TODO_SUCCESS,
	UPDATE_TODO_FAILURE,
	UPDATE_TODO_START,
	UPDATE_TODO_SUCCESS,
} from "./types";

export const createTodo = (body: Todo) => async (dispatch: AppDispatch) => {
	try {
		dispatch({
			type: CREATE_TODO_START,
		});
		const res = await Api.post("/todo/create", body);
		if (res) {
			dispatch({
				type: CREATE_TODO_SUCCESS,
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
			type: CREATE_TODO_FAILURE,
			payload: err.response?.data?.message,
		});
		dispatch(alertActions.error(err.response?.data?.message));
		setTimeout(() => {
			dispatch(alertActions.error_clear());
			dispatch(alertActions.clear());
		}, 3000);
	}
};

export const getTodoListWithUserId =
	(userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_TODO_START,
			});
			const res = await Api.get(`/todo/${userId}`);
			if (res) {
				dispatch({
					type: GET_TODO_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GET_TODO_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const updateTodo =
	(body: Todo, todoId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_TODO_START,
			});
			const res = await Api.patch(`/todo/${todoId}`, body);
			if (res) {
				dispatch({
					type: UPDATE_TODO_SUCCESS,
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
				type: UPDATE_TODO_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const deleteTodo =
	(todoId: string, userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_TODO_START,
			});
			const res = await Api.delete(`/todo/${todoId}/${userId}`);
			if (res) {
				dispatch({
					type: DELETE_TODO_SUCCESS,
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
				type: DELETE_TODO_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(alertActions.error(err.response?.data?.message));
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const generateTodoDesc =
	(todoTitle: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GENERATE_DESCRIPTION_START,
			});
			const res = await Api.post("/todo/generate-todo-description", {
				todoTitle,
			});
			if (res) {
				dispatch({
					type: GENERATE_DESCRIPTION_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GENERATE_DESCRIPTION_FAILURE,
				payload: err.response?.data?.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data?.message ||
						"Something went wrong while generating todo description"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};
