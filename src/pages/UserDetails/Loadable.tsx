import { lazyLoad } from "../../utils/loadable";

export const UserDetailsPage = lazyLoad(
	() => import("./index"),
	(module) => module.UserDetailsPage
);
