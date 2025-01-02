import { Api } from "../redux/api";

const SetAuthToken = (token: string) => {
	if (token) {
		if (!localStorage.getItem("asp-todo-qa-token")) {
			localStorage.setItem("asp-todo-qa-token", token);
		}
		Api.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		delete Api.defaults.headers.common["Authorization"];
	}
};

export default SetAuthToken;
