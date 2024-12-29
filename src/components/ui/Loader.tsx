import React from "react";

type Props = {
	color?: string;
};

const Loader = (props: Props) => {
	const { color } = props;
	return (
		<div className="flex items-center justify-center">
			<div
				className={`loader animate-spin rounded-full border-4 ${
					color === "white" ? `border-${color}` : `border-${color}-600`
				} border-t-transparent`}
				style={{
					width: "15px",
					height: "15px",
				}}></div>
		</div>
	);
};

export default Loader;
