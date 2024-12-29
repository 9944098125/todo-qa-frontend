import { lazyLoad } from "../../utils/loadable";

export const Login = lazyLoad(
	() => import("./index"),
	(module) => module.Login
);
