import { Api } from "../redux/api";

const SetAuthToken = (token: string) => {
	if (token) {
		Api.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		delete Api.defaults.headers.common["Authorization"];
	}
};

export default SetAuthToken;
