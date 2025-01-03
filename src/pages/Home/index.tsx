import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = Cookies.get("asp-todo-qa-token");

				if (!token) {
					throw new Error("Token not found in cookies");
				}

				const response = await fetch(
					"https://todo-qa-with-ts-backend-production.up.railway.app/login/success",
					{
						method: "GET",
						credentials: "include", // Include cookies
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}

				const data = await response.json();
				console.log("User data:", data);

				if (data.user) {
					// Optionally save user data in localStorage for future use
					localStorage.setItem("asp-todo-qa-user", JSON.stringify(data.user));
					// Redirect to the appropriate page
					navigate("/todo-items", { replace: true });
				} else {
					throw new Error("User data missing");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
				Cookies.remove("asp-todo-qa-token"); // Clear invalid token if needed
				navigate("/login", { replace: true });
			}
		};

		// Call the function
		fetchUserData();
	}, [navigate]);

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<h1 className="text-red-600 rounded-lg border border-cyan-600 p-5 font-bold text-2xl">
				Hello User/Admin, please wait while we redirect you to your allocated
				page.
			</h1>
		</div>
	);
};
