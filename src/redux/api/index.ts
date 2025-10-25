import Axios from "axios";

export const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "todo-qa-with-ts-backend-production.up.railway.app/api",
	headers: {
		"Content-Type": "application/json",
	},
});
