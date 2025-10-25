import Axios from "axios";

export const Api = Axios.create({
	// baseURL: "http://localhost:5000/api",
	// Use full URL including protocol for deployed backend. Prefer reading from an env var
	// e.g. process.env.REACT_APP_API_BASE_URL
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
