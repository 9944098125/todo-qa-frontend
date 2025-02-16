import { lazyLoad } from "../../utils/loadable";

export const NotFound = lazyLoad(
	() => import("./index"),
	(module) => module.NotFound
);
