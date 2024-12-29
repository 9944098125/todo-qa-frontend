import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<React.Fragment>
			<div className="w-full min-h-screen flex items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<img src="/images/404.webp" alt="" className="object-cover" />
					<Link to="/" className="decoration-none text-white">
						<button
							type="button"
							className="bg-blue-600 hover:bg-blue-800 text-white border-none-rounded-md h-[50px] w-[250px]">
							Go To Home Page
						</button>
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};
