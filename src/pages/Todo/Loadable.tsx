import { lazyLoad } from "../../utils/loadable";

export const Todo = lazyLoad(
	() => import("./index"),
	(module) => module.Todo
);
