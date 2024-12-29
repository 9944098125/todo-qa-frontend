import React from "react";

const GoogleLogin = () => {
	const handleGoogleLogin = () => {
		window.open(
			// "http://localhost:5000/auth/google/callback",
			`http://todo-qa-with-ts-backend-production.up.railway.app/auth/google/callback`,
			"_self"
		);
	};
	return (
		<React.Fragment>
			<button
				onClick={handleGoogleLogin}
				type="button"
				className="border border-blue-600 w-full py-4 rounded-lg flex items-center justify-center space-x-2">
				<img src="/images/search.png" className="w-10 h-10" alt="" />
			</button>
		</React.Fragment>
	);
};

export default GoogleLogin;
