import { lazyLoad } from "../../utils/loadable";

export const Qa = lazyLoad(
	() => import("./index"),
	(module) => module.Qa
);
