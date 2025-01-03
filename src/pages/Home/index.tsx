import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("asp-todo-qa-token")) {
			navigate("/login", { replace: true });
		} else {
			if (JSON.parse(localStorage.getItem("asp-todo-qa-user")!)?.isAdmin) {
				navigate("/users");
			} else {
				navigate("todo-items");
			}
		}
	}, [navigate]);
	return <div>Home</div>;
};

export default Home;
