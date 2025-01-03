import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "../reducers";
import SetAuthToken from "../../utils/set-auth-token";

// Define the type for the middleware array
const middleware: any = [thunk];

// Create the store with type annotations
const store = createStore<any, any>(
	rootReducer,
	{},
	applyMiddleware(...middleware)
);

let currentState;

store.subscribe(() => {
	let token;
	// gets the present state of the store
	currentState = store.getState();
	if (currentState.login?.token) {
		token = currentState.login.token;
	}
	if (token) {
		SetAuthToken(token);
	}
});

export default store;
