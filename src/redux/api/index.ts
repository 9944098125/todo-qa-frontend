import Axios from "axios";
import Cookies from "js-cookie";

export const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://todo-qa-with-ts-backend-production.up.railway.app/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// Add a request interceptor to set the Authorization header
Api.interceptors.request.use((config) => {
	const token = Cookies.get("asp-todo-qa-token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});
