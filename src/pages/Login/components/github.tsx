import React from "react";

const GithubLogin = () => {
	const handleGithubLogin = () => {
		window.open(
			// "http://localhost:5000/auth/github/callback",
			"http://todo-qa-with-ts-backend-production.up.railway.app/auth/github/callback",
			"_self"
		);
	};
	return (
		<React.Fragment>
			<button
				onClick={handleGithubLogin}
				className="bg-black w-full flex justify-center items-center rounded-lg py-4">
				<img
					src="/images/github.png"
					alt=""
					className="w-10 h-10 bg-white rounded-full"
				/>
			</button>
		</React.Fragment>
	);
};

export default GithubLogin;
