import { lazyLoad } from "../../utils/loadable";

export const RegistrationPage = lazyLoad(
	() => import("./index"),
	(module) => module.Registration
);
