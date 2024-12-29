import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SetAuthToken from "../../utils/set-auth-token";
import Cookies from "js-cookie";

export const Home = () => {
	const navigate = useNavigate();

	// Fetch the login success data
	useEffect(() => {
		const getUser = async () => {
			await fetch(
				// "http://localhost:5000/login/success",
				"https://todo-qa-with-ts-backend-production.up.railway.app/login/success",
				{ method: "GET", credentials: "include" } // Include cookies in the request
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch login success data");
					}
					return res.json();
				})
				.then((data) => {
					if (data) {
						localStorage.setItem(
							"asp-todo-qa-user",
							JSON.stringify(data?.user)
						);
						navigate("/todo-items", { replace: true });
					} else {
						navigate("/login", { replace: true });
					}
					console.log(data);
				})
				.catch((err) => {
					console.error(err);
					navigate("/login", { replace: true });
				});
		};

		getUser();
	}, [navigate]);

	// Redirect to login if user is not in localStorage
	useEffect(() => {
		if (!localStorage.getItem("asp-todo-qa-user")) {
			navigate("/login", { replace: true });
		}
	}, [navigate]);

	return (
		<React.Fragment>
			<div className="w-full h-screen flex items-center justify-center">
				<h1 className="text-red-600 rounded-lg border border-cyan-600 p-5 font-bold text-2xl">
					Hello User/Admin, please wait you will be redirected to your allocated
					page.
				</h1>
			</div>
		</React.Fragment>
	);
};
