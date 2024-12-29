import React, { useEffect, useState } from "react";

type Props = {
	type?: "button" | "submit" | "reset"; // Restrict type to valid button types
	variant: "BLUE" | "OUTLINED" | "DARK" | "DESTRUCTIVE"; // Restrict variant to specific values
	children: React.ReactNode; // Ensure type safety for children
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Extend button attributes

const GlobalButton = (props: Props) => {
	const { type = "button", variant, children, ...rest } = props; // Destructure and spread remaining props
	const [classes, setClasses] = useState<string>("");

	useEffect(() => {
		// Assign specific Tailwind classes based on the variant
		switch (variant) {
			case "BLUE":
				setClasses("bg-blue-600 hover:bg-blue-800 text-white");
				break;
			case "OUTLINED":
				setClasses(
					"bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100"
				);
				break;
			case "DARK":
				setClasses("bg-gray-800 hover:bg-black text-white");
				break;
			case "DESTRUCTIVE":
				setClasses("bg-red-600 hover:bg-red-800 text-white");
				break;
			default:
				setClasses("bg-transparent text-blue-600");
				break;
		}
	}, [variant]); // Re-run the effect if the variant changes

	return (
		<React.Fragment>
			{/* Button to use globally with variants */}
			<button
				type={type}
				className={`text-[16px] rounded-[9px] flex items-center justify-center space-x-4 px-5 py-2 ${classes}`}
				{...rest} // Spread additional props
			>
				{children}
			</button>
		</React.Fragment>
	);
};

export default GlobalButton;
