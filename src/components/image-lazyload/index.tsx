import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
	image: string;
	className: string;
};
export function ImageLazyLoad(props: Props) {
	const { image, className } = props;
	return (
		<LazyLoadImage
			src={image}
			effect="opacity"
			className={className}
			referrerPolicy="no-referrer"
		/>
	);
}
