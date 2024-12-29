import React from "react";

type Props = {
	htmlFor: string;
	label: string;
};
const Label = (props: Props) => {
	const { htmlFor, label } = props;
	return (
		<React.Fragment>
			<label
				htmlFor={htmlFor}
				className="w-full whitespace-nowrap text-md cursor-pointer font-poppins font-medium">
				{label}
			</label>
		</React.Fragment>
	);
};

export default Label;
