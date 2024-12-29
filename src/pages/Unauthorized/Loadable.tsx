import { lazyLoad } from "../../utils/loadable";

export const Unauthorized = lazyLoad(
	() => import("./index"),
	(module) => module.Unauthorized
);
