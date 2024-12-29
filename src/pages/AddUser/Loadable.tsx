import { lazyLoad } from "../../utils/loadable";

export const AddUser = lazyLoad(
	() => import("./index"),
	(module) => module.AddUser
);
