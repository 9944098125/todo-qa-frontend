import Axios from "axios";
import {
	getApiErrorMessage,
	normalizeApiResponse,
} from "../../utils/api-response";

export const Api = Axios.create({
	baseURL: "https://todo-qa-with-ts-backend-production.up.railway.app/api",
	headers: {
		"Content-Type": "application/json",
	},
});

Api.interceptors.response.use(
	(response) => {
		response.data = normalizeApiResponse(response.data);
		return response;
	},
	(error) => {
		const message = getApiErrorMessage(error);
		if (error.response?.data && typeof error.response.data === "object") {
			error.response.data = {
				...error.response.data,
				message,
			};
		}
		return Promise.reject(error);
	}
);
