import React, { useEffect } from "react";
import Label from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import PasswordInput from "./password-input";
import Loader from "../../../components/ui/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

type Props = {
	form: any;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	showConfirmPassword: boolean;
	setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
	errors: any;
	submitRegistrationForm: (data: any) => void;
	changeImage: (file: any) => void;
	uploading: boolean;
	image: string;
};

const RegistrationForm = (props: Props) => {
	const {
		form,
		showPassword,
		setShowPassword,
		submitRegistrationForm,
		showConfirmPassword,
		setShowConfirmPassword,
		errors,
		changeImage,
		uploading,
		image,
	} = props;

	const RegisterState = useSelector((state: RootState) => state.register);

	return (
		<React.Fragment>
			<form
				className="w-full h-full"
				onSubmit={form.handleSubmit(submitRegistrationForm)}>
				<div className="flex flex-col md:flex-row items-center space-x-2 w-full mb-4">
					<div className="w-full md:w-1/2 p-2">
						<Label htmlFor="name" label="Full Name" />
						<Input
							type="text"
							className="rounded-default border-2 active:border-cyan-600 focus:border-cyan-600 outline-none"
							{...form.register("name", {
								required: "Name is required!",
							})}
							id="name"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</div>

					<div className="w-full md:w-1/2 p-2">
						<Label htmlFor="email" label="Email Address" />
						<Input
							type="text"
							className="rounded-default border-2 active:border-cyan-600 focus:border-cyan-600 outline-none"
							{...form.register("email", {
								required: "Email is required!",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Invalid email address",
								},
							})}
							id="email"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center space-x-2 w-full mb-4">
					<div className="w-full md:w-1/2 p-2">
						<Label htmlFor="phone" label="Phone Number" />
						<Input
							type="text"
							className="rounded-default border-2 active:border-cyan-600 focus:border-cyan-600 outline-none"
							{...form.register("phone", {
								required: "Phone number is required!",
								pattern: {
									value: /^[0-9]{10}$/,
									message: "Phone number must be exactly 10 digits",
								},
							})}
							id="phone"
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>

					<div className="w-full md:w-1/2 flex items-center space-x-2 p-2">
						<div className="w-full">
							<Label htmlFor="profilePicture" label="Profile Picture" />
							<div className="flex items-center">
								<Input
									type="file"
									onChange={(event: any) => changeImage(event.target?.files[0])}
									className="rounded-default border-2 active:border-cyan-600 focus:border-cyan-600 outline-none"
									id="profilePicture"
								/>
							</div>
						</div>
						{image && (
							<img
								src={image}
								alt=""
								height={150}
								width={150}
								style={{ borderRadius: "50%" }}
							/>
						)}
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center space-x-2 w-full mb-4">
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
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="w-full md:w-1/2 p-2">
						<PasswordInput
							label="Confirm Password"
							fieldName="confirmPassword"
							form={form}
							showPassword={showConfirmPassword}
							setShowPassword={setShowConfirmPassword}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center space-x-2 w-full mb-4">
					<div className="w-full p-2 flex flex-col">
						<Label htmlFor="bio" label="Bio" />
						<textarea
							rows={3}
							className="rounded-default border-2 active:border-cyan-600 focus:border-cyan-600 outline-none"
							{...form.register("bio", { required: "Bio is required!" })}
							id="bio"
						/>
						{errors.bio && (
							<p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
						)}
					</div>
				</div>

				<div className="p-2 w-full">
					<button
						disabled={uploading || RegisterState?.isLoading}
						type="submit"
						className="bg-orange-500 h-[42px] text-white hover:bg-orange-700 border-none w-full flex items-center justify-center space-x-5 rounded-md">
						Register{" "}
						{(uploading || RegisterState?.isLoading) && (
							<Loader color="white" />
						)}
					</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default RegistrationForm;
