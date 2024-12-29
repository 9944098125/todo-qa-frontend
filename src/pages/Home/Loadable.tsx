import { lazyLoad } from "../../utils/loadable";

export const Home = lazyLoad(
	() => import("./index"),
	(module) => module.Home
);
