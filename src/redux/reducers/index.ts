import { combineReducers, UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import theme from "./theme";
import sidebar from "./sidebar";
import login from "./login";
import register from "./register";
import { alert } from "./alert";
import profile from "./profile";
import successReducer from "./success";
import admin from "./admin";
import { Todo } from "../../utils/interfaces";
import todo from "./todo";
import qa from "./qa";
import search from "./search";

export const rootReducer = combineReducers({
	theme,
	sidebar,
	login,
	register,
	alert,
	profile,
	successReducer,
	admin,
	todo,
	qa,
	search,
});

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

export interface RootState {
	theme: {
		dark: boolean;
	};
	sidebar: {
		open: boolean;
	};
	alert: {
		type: string;
		message: string;
	};
	login: {
		token: string;
		user: {
			_id: string;
			name: string;
			email: string;
			password: string;
			profilePicture: string;
			phone: string;
			bio: string;
			isAdmin: boolean;
		};
		isAuthenticated: boolean;
		isLoading: boolean;
		error: any;
		message: string;
		updateSuccess: boolean;
	};
	register: {
		isLoading: boolean;
		error: string;
		message: string;
		success: boolean;
	};
	profile: {
		isLoading: boolean;
		error: string | null;
		success: boolean;
		profile: {
			message: string;
			user: {
				_id: string;
				name: string;
				email: string;
				profilePicture: string;
				phone: string;
				bio: string;
				isAdmin: boolean;
			};
		};
		aiImage: null;
		message: null;
		toggler: boolean;
	};
	successReducer: {
		success: boolean;
	};
	admin: {
		isLoading: boolean;
		error: string | null;
		success: boolean;
		users: {
			_id: string;
			name: string;
			email: string;
			profilePicture: string;
			phone: string;
			bio: string;
			isAdmin: boolean;
		}[];
		successMessage: string;
		user: {
			_id: string;
			name: string;
			email: string;
			profilePicture: string;
			phone: string;
			bio: string;
			isAdmin: boolean;
		};
		toggler: boolean;
		todoItems: Todo[];
		qaItems: {
			_id: string;
			question: string;
			answer: string;
			importance: string;
			toolId: string;
		}[];
	};
	todo: {
		todoItems: {
			_id: string;
			title: string;
			description: string;
			urgency: boolean;
			deadline: string;
		}[];
		success: boolean;
		error: any;
		isLoading: boolean;
		message: string;
		aiDesc: string;
		todoCountChanged: boolean;
	};
	qa: {
		qaItems: {
			_id: string;
			question: string;
			answer: string;
			importance: string;
			toolId: string;
		}[];
		success: boolean;
		message: any;
		aiAnswer: any;
		isLoading: boolean;
		createdUpdatedSuccessfully: boolean;
	};
	search: {
		filteredItems: any[];
	};
}
