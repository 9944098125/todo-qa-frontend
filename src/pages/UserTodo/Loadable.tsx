import { lazyLoad } from "../../utils/loadable";

export const UserTodo = lazyLoad(
	() => import("./index"),
	(module) => module.UserTodo
);
