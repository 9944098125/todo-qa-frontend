import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import Loader from "../../../components/ui/Loader";
import { Link } from "react-router-dom";
import PasswordInput from "../../Registration/components/password-input";

type Props = {
	submit: (data: any) => void;
};
const LoginForm = (props: Props) => {
	const { submit } = props;
	const LoginDetails = useSelector((state: RootState) => state.login);
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;
	return (
		<React.Fragment>
			<div className="w-full bg-blue-50 rounded-md p-5 shadow-lg">
				<form onSubmit={handleSubmit(submit)}>
					<div className="w-full bg-green-100 mb-5 p-5">
						<label
							htmlFor="emailOrPhone"
							className="block text-gray-700 text-sm font-bold mb-2">
							Email Address/Phone Number
						</label>
						<Input
							type="text"
							{...register("emailOrPhone", {
								required: "Email is required",
								pattern: {
									value:
										/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$|^(\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
									message: "Invalid email or phone number format",
								},
							})}
							id="emailOrPhone"
							className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
							placeholder="Enter your email"
						/>
						{/* Error message for email */}
						{errors.emailOrPhone && (
							<p className="text-red-600 text-sm mt-1">
								{String(errors?.emailOrPhone?.message)}
							</p>
						)}
					</div>

					<div className="w-full bg-pink-100 mb-5 p-5">
						<PasswordInput
							showPassword={showPassword}
							setShowPassword={setShowPassword}
							label="Password"
							fieldName="password"
							form={form}
							placeholder="Enter your Password"
						/>
						{/* Error message for password */}
						{errors.password && (
							<p className="text-red-600 text-sm mt-1">
								{String(errors?.password?.message)}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="bg-blue-600 border-none h-[45px] hover:bg-blue-800 disabled:bg-blue-500 disabled:cursor-wait rounded-lg w-full flex items-center justify-center space-x-6">
						<span className="text-white font-bold text-14px">Login</span>
						<span className="">
							{LoginDetails?.isLoading && <Loader color="white" />}
						</span>
					</button>
				</form>
				<p className="text-[12px] text-red-500 font-poppins font-normal">
					Don't have an account ? Please{" "}
					<Link
						to="/register"
						className="hover:underline"
						style={{
							textDecoration: "none",
							color: "blue",
							fontWeight: "bold",
						}}>
						Register
					</Link>
				</p>
			</div>
		</React.Fragment>
	);
};
export default LoginForm;
