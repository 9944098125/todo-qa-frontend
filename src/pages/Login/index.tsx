import React, { useEffect, useState } from "react";
import LoginForm from "./components/login-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/login";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import { AlertModal } from "../../components/ui/alert";
import TabTitle from "../../utils/tab-title";

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const LoginDetails = useSelector((state: RootState) => state.login);
	const AlertState = useSelector((state: RootState) => state.alert);

	const submitLoginForm = (data: any) => {
		console.log("data", data);
		const body = {
			emailOrPhone: data?.emailOrPhone,
			password: data?.password,
		};
		dispatch(login(body) as any);
	};

	useEffect(() => {
		if (LoginDetails?.isAuthenticated || LoginDetails?.token) {
			if (LoginDetails?.user?.isAdmin) {
				navigate("/users", { replace: true });
			} else {
				navigate("/todo-items", { replace: true });
			}
		}
	}, [
		LoginDetails?.isAuthenticated,
		LoginDetails?.token,
		LoginDetails?.user,
		navigate,
	]);

	useEffect(() => {
		if (
			localStorage.getItem("asp-todo-qa-token") ||
			localStorage.getItem("asp-todo-qa-user")
		) {
			if (JSON.parse(localStorage.getItem("asp-todo-qa-user")!)?.isAdmin) {
				navigate("/users", { replace: true });
			} else {
				navigate("/todo-items", { replace: true });
			}
		}
	}, [navigate]);

	// State to trigger the slide-in animation
	const [isVisible, setIsVisible] = useState(false);

	// Trigger the animation when the component mounts
	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<React.Fragment>
			<TabTitle title="Login" />
			{AlertState?.message && <AlertModal show={true} />}
			<div className="w-full min-h-screen grid grid-cols-12">
				{/* Left-side columns with slide-in animation */}
				<div
					className={`col-span-6 lg:col-span-3 transition-transform duration-1000 ease-out transform ${
						isVisible ? "translate-x-0" : "-translate-x-full"
					}`}>
					<div className="w-full min-h-screen bg-cyan-600 flex flex-col justify-start items-center py-10">
						<p className="text-[5rem] md:text-[7rem] lg:text-[10rem] text-white font-medium">
							Log
						</p>
					</div>
				</div>

				<div
					className={`col-span-4 lg:col-span-2 transition-transform duration-1000 ease-out transform ${
						isVisible ? "translate-x-0" : "-translate-x-full"
					}`}>
					<div className="w-full min-h-screen bg-pink-600 flex flex-col justify-center items-center">
						<p className="text-[3.5rem] md:text-[5.25rem] lg:text-[7rem] text-white font-medium">
							Into
						</p>
					</div>
				</div>

				<div
					className={`col-span-2 lg:col-span-1 transition-transform duration-1000 ease-out transform ${
						isVisible ? "translate-x-0" : "-translate-x-full"
					}`}>
					<div className="w-full min-h-screen bg-blue-600 flex flex-col justify-center items-center">
						<p className="text-[2rem] md:text-[3.2rem] lg:text-[5rem] text-white font-medium transform rotate-[-90deg]">
							TodoQa
						</p>
					</div>
				</div>

				{/* Right-side column for Login Form */}
				<div
					className="col-span-12 lg:col-span-6 flex items-end relative"
					style={{
						backgroundImage: `url("/images/login-bg.avif")`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}>
					{/* Background overlay */}
					<div className="absolute inset-0 bg-black opacity-30 z-0"></div>
					<div className="relative z-10 w-full">
						<LoginForm submit={submitLoginForm} />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
