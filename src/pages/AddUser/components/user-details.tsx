import React, { useEffect, useState } from "react";
import { Input } from "../../../components/ui/Input";
import { useForm } from "react-hook-form";
import Label from "../../../components/ui/Label";
import GlobalButton from "../../../components/ui/button";
import { useDispatch } from "react-redux";
import Loader from "../../../components/ui/Loader";
import { createUser } from "../../../redux/actions/admin";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Registration/components/password-input";

type Props = {
	loading: boolean;
	success: boolean;
	image: string;
};
const UserDetails = (props: Props) => {
	const navigate = useNavigate();
	const { loading, success, image } = props;

	const [showPassword, setShowPassword] = useState(false);

	const form = useForm();
	const {
		formState: { errors },
	} = form;
	const dispatch = useDispatch();
	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") || "null")
		: null;

	const submitProfileForm = (data: any) => {
		const body = {
			name: data.name,
			email: data.email,
			phone: data.phone,
			password: data.password,
			profilePicture: image,
			bio: data.bio,
		};
		dispatch(createUser(user?._id, body) as any);
	};

	useEffect(() => {
		if (success) {
			navigate("/users");
		}
	}, [navigate, success]);

	return (
		<React.Fragment>
			{/* basic user details */}
			<div className="p-4 lg:p-8 relative w-full rounded-lg mt-5">
				<form
					className="w-full"
					onSubmit={form.handleSubmit(submitProfileForm)}>
					<div className="mb-4">
						<Label htmlFor="name" label="Name" />
						<Input
							className={`rounded-lg bg-transparent`}
							type="text"
							{...form.register("name", {
								required: "Please Enter Your Name !",
							})}
							placeholder="Enter your Name"
							id="name"
						/>
					</div>

					<div className="mb-4">
						<Label htmlFor="email" label="Email" />
						<Input
							className={`rounded-lg bg-transparent`}
							type="text"
							{...form.register("email", {
								required: "Please Enter Your Email Address !",
							})}
							placeholder="Enter your Email Address"
							id="email"
						/>
					</div>

					<div className="w-full md:w-1/2 p-2">
						<PasswordInput
							label="Password"
							fieldName="password"
							form={form}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message as string}
							</p>
						)}
					</div>

					<div className="mb-4">
						<Label htmlFor="phone" label="Phone" />
						<Input
							className={`rounded-lg bg-transparent`}
							type="text"
							{...form.register("phone", {
								required: "Please Enter Your Phone !",
							})}
							placeholder="Enter your Phone Number"
							id="phone"
						/>
					</div>

					<div className="mb-4">
						<Label htmlFor="bio" label="bio" />
						<textarea
							rows={5}
							{...form.register("bio", {
								required: "Please Enter Your bio !",
							})}
							placeholder="Enter your bio"
							className={`rounded-lg w-full p-4 bg-transparent`}
							id="bio"
						/>
					</div>
					<div className="flex items-center space-x-5 justify-end">
						<div className="flex items-center justify-end">
							<GlobalButton type="submit" variant="BLUE">
								Save {loading && <Loader color="white" />}
							</GlobalButton>
						</div>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};

export default UserDetails;
