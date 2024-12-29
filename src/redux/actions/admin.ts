import { AppDispatch } from "./../reducers/index";
import { Qa, RegisterProps, Todo } from "../../utils/interfaces";
import { Api } from "../api";
import { alertActions } from "./alert";
import {
	CREATE_QA_FOR_USER_FAILURE,
	CREATE_QA_FOR_USER_START,
	CREATE_QA_FOR_USER_SUCCESS,
	CREATE_TODO_FOR_USER_FAILURE,
	CREATE_TODO_FOR_USER_START,
	CREATE_TODO_FOR_USER_SUCCESS,
	CREATE_USER_FAILURE,
	CREATE_USER_START,
	CREATE_USER_SUCCESS,
	DELETE_QA_FOR_USER_FAILURE,
	DELETE_QA_FOR_USER_START,
	DELETE_QA_FOR_USER_SUCCESS,
	DELETE_TODO_FOR_USER_FAILURE,
	DELETE_TODO_FOR_USER_START,
	DELETE_TODO_FOR_USER_SUCCESS,
	DELETE_USER_FAILURE,
	DELETE_USER_START,
	DELETE_USER_SUCCESS,
	GET_QA_OF_USER_FAILURE,
	GET_QA_OF_USER_START,
	GET_QA_OF_USER_SUCCESS,
	GET_TODO_FOR_USER_FAILURE,
	GET_TODO_FOR_USER_START,
	GET_TODO_FOR_USER_SUCCESS,
	GET_USER_START,
	GET_USER_SUCCESS,
	GET_USERS_FAILURE,
	GET_USERS_START,
	GET_USERS_SUCCESS,
	UPDATE_QA_FOR_USER_FAILURE,
	UPDATE_QA_FOR_USER_START,
	UPDATE_QA_FOR_USER_SUCCESS,
	UPDATE_TODO_FOR_USER_FAILURE,
	UPDATE_TODO_FOR_USER_START,
	UPDATE_TODO_FOR_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
} from "./types";

export const getUsers = () => async (dispatch: AppDispatch) => {
	try {
		dispatch({
			type: GET_USERS_START,
		});
		const res = await Api.get("/admin/users");
		if (res) {
			dispatch({
				type: GET_USERS_SUCCESS,
				payload: res.data,
			});
		}
	} catch (err: any) {
		dispatch({
			type: GET_USERS_FAILURE,
			payload: err?.response?.data.message,
		});
		dispatch(
			alertActions.error(err.response?.data.message || "Something went wrong !")
		);
		setTimeout(() => {
			dispatch(alertActions.error_clear());
			dispatch(alertActions.clear());
		}, 3000);
	}
};

export const createUser =
	(adminId: string, data: Partial<RegisterProps>) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: CREATE_USER_START,
			});
			const res = await Api.post(`/admin/createUser/${adminId}`, data);
			if (res) {
				dispatch({
					type: CREATE_USER_SUCCESS,
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
				type: CREATE_USER_FAILURE,
				payload: err.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const getUserById =
	(userId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_USER_START,
			});
			const res = await Api.get(`/admin/user/${userId}`);
			if (res) {
				dispatch({
					type: GET_USER_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GET_USERS_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const updateUser =
	(userId: string, data: any) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_USER_START,
			});
			const res = await Api.patch(`/admin/updateUser/${userId}`, data);
			if (res) {
				dispatch({
					type: UPDATE_USER_SUCCESS,
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
				type: UPDATE_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const deleteUser =
	(userId: string, adminId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_USER_START,
			});
			const res = await Api.delete(`/admin/deleteUser/${userId}/${adminId}`);
			if (res) {
				dispatch({
					type: DELETE_USER_SUCCESS,
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
				type: DELETE_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const createTodoForUser =
	(body: Partial<Todo>, userId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: CREATE_TODO_FOR_USER_START,
			});
			const res = await Api.post(
				`/admin/createTodo/${userId}/${adminId}`,
				body
			);
			if (res) {
				dispatch({
					type: CREATE_TODO_FOR_USER_SUCCESS,
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
				type: CREATE_TODO_FOR_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const getTodoOfUser =
	(userId: string, adminId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_TODO_FOR_USER_START,
			});
			const res = await Api.get(`/admin/todo/${userId}/${adminId}`);
			if (res) {
				dispatch({
					type: GET_TODO_FOR_USER_SUCCESS,
					payload: res.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GET_TODO_FOR_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const updateTodoForUser =
	(body: Partial<Todo>, userId: string, todoId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_TODO_FOR_USER_START,
			});
			const res = await Api.patch(
				`/admin/updateTodo/${userId}/${todoId}/${adminId}`,
				body
			);
			if (res) {
				dispatch({
					type: UPDATE_TODO_FOR_USER_SUCCESS,
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
				type: UPDATE_TODO_FOR_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const deleteTodoOfUser =
	(userId: string, todoId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_TODO_FOR_USER_START,
			});
			const res = await Api.delete(
				`/admin/deleteTodo/${userId}/${todoId}/${adminId}`
			);
			if (res) {
				dispatch({
					type: DELETE_TODO_FOR_USER_SUCCESS,
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
				type: DELETE_TODO_FOR_USER_FAILURE,
				payload: err?.response?.data.message,
			});
			dispatch(
				alertActions.error(
					err.response?.data.message || "Something went wrong !"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const createQaForUser =
	(body: Partial<Qa>, userId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: CREATE_QA_FOR_USER_START,
			});
			const res = await Api.post(`/admin/createQa/${userId}/${adminId}`, body);
			if (res) {
				dispatch({
					type: CREATE_QA_FOR_USER_SUCCESS,
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
				type: CREATE_QA_FOR_USER_FAILURE,
				payload: err?.response.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response.data?.message ||
						"Something went wrong while create qa for the user"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const getQaOfAUser =
	(userId: string, toolId: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: GET_QA_OF_USER_START,
			});
			const res = await Api.get(`/admin/qa/${userId}/${toolId}`);
			if (res) {
				dispatch({
					type: GET_QA_OF_USER_SUCCESS,
					payload: res?.data,
				});
			}
		} catch (err: any) {
			dispatch({
				type: GET_QA_OF_USER_FAILURE,
				payload: err?.response.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response.data?.message ||
						"Something went wrong while fetching qa of the user"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const updateQaForUser =
	(body: Partial<Qa>, userId: string, qaId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: UPDATE_QA_FOR_USER_START,
			});
			const res = await Api.patch(
				`/admin/updateQa/${userId}/${qaId}/${adminId}`,
				body
			);
			if (res) {
				dispatch({
					type: UPDATE_QA_FOR_USER_SUCCESS,
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
				type: UPDATE_QA_FOR_USER_FAILURE,
				payload: err?.response.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response.data?.message ||
						"Something went wrong while updating user Qa"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};

export const deleteQaForUser =
	(userId: string, qaId: string, adminId: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch({
				type: DELETE_QA_FOR_USER_START,
			});
			const res = await Api.delete(
				`/admin/deleteQa/${userId}/${qaId}/${adminId}`
			);
			if (res) {
				dispatch({
					type: DELETE_QA_FOR_USER_SUCCESS,
					payload: res?.data?.message,
				});
				dispatch(alertActions.success(res?.data?.message));
				setTimeout(() => {
					dispatch(alertActions.success_clear());
					dispatch(alertActions.clear());
				}, 3000);
			}
		} catch (err: any) {
			dispatch({
				type: DELETE_QA_FOR_USER_FAILURE,
				payload: err?.res.data?.message,
			});
			dispatch(
				alertActions.error(
					err?.response.data?.message ||
						"Something went wrong while deleting the qa of user"
				)
			);
			setTimeout(() => {
				dispatch(alertActions.error_clear());
				dispatch(alertActions.clear());
			}, 3000);
		}
	};
