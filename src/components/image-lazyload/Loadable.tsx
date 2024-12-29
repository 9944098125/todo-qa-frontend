import { lazyLoad } from "../../utils/loadable";

export const ImageLazyLoad = lazyLoad(
	() => import("./index"),
	(module) => module.ImageLazyLoad
);
