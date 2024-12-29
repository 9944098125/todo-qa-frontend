import "./App.css";
import BaseRoutes from "./routing/routes";
import store from "./redux/store/store";
import { Provider } from "react-redux";

export default function App() {
	return (
		<Provider store={store}>
			<BaseRoutes />
		</Provider>
	);
}
