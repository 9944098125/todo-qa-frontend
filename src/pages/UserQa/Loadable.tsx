import { lazyLoad } from "../../utils/loadable";

export const UserQa = lazyLoad(
	() => import("./index"),
	(module) => module.UserQa
);
