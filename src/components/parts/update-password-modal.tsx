import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { RootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import GlobalButton from "../ui/button";
import { RiCloseCircleFill } from "react-icons/ri";
import { updatePassword } from "../../redux/actions/login";
import Loader from "../ui/Loader";
import PasswordInput from "../../pages/Registration/components/password-input";
import "react-responsive-modal/styles.css";

type Props = {
	show: boolean;
	setShow: (val: boolean) => void;
	userId: string;
};
const UpdatePasswordModal = (props: Props) => {
	const { show, setShow, userId } = props;
	const ThemeState = useSelector((state: RootState) => state.theme);
	const AuthState = useSelector((state: RootState) => state.login);
	const AlertState = useSelector((state: RootState) => state.alert);

	const dispatch = useDispatch();
	const form = useForm();

	const {
		formState: { errors },
	} = form;

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const submitUpdatePassword = (data: any) => {
		const body = {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		};
		dispatch(updatePassword(userId as string, body) as any);
	};

	useEffect(() => {
		if (AuthState?.updateSuccess && AlertState.message) {
			setShow(false);
		}
	}, [AuthState.updateSuccess]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent form submission
		}
	};

	const closeIcon = (
		<div className="border-blue-600 border rounded-full p-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none">
				<path
					d="M18 6L6 18M6 6L18 18"
					stroke="#667085"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	);

	return (
		<React.Fragment>
			<div className="w-full md:w-1/2">
				<Modal
					styles={{
						modal: {
							backgroundColor: ThemeState.dark ? "black" : "",
							color: ThemeState.dark ? "white" : "",
							border: "1px #0096FF solid",
							borderRadius: "9px",
							width: "95%",
						},
					}}
					closeIcon={closeIcon}
					closeOnOverlayClick={false}
					open={show}
					onClose={() => setShow(false)}
					center>
					<form
						onKeyDown={handleKeyDown}
						onSubmit={form.handleSubmit(submitUpdatePassword)}>
						<div className="w-full p-2">
							<div className="w-full flex items-center justify-between p-4">
								<h4 className="text-2xl font-medium font-poppins">
									Update Password
								</h4>
								{/* <button
									onClick={() => setShow(false)}
									className="bg-transparent hover:border border-blue-600 rounded-full p-2">
									<RiCloseCircleFill fontSize={25} />
								</button> */}
							</div>
							<div className="w-full p-2">
								<PasswordInput
									label="Old Password"
									fieldName="oldPassword"
									form={form}
									showPassword={showOldPassword}
									setShowPassword={setShowOldPassword}
								/>
								{errors.oldPassword && (
									<p className="text-red-500 text-sm mt-1">
										{errors.oldPassword.message as string}
									</p>
								)}
							</div>

							<div className="w-full p-2">
								<PasswordInput
									label="New Password"
									fieldName="newPassword"
									form={form}
									showPassword={showNewPassword}
									setShowPassword={setShowNewPassword}
								/>
								{errors.newPassword && (
									<p className="text-red-500 text-sm mt-1">
										{errors.newPassword.message as string}
									</p>
								)}
							</div>

							<div className="flex items-center justify-end">
								<GlobalButton variant="BLUE" type="submit">
									<p>submit</p>
									{AuthState.isLoading && <Loader color="white" />}
								</GlobalButton>
							</div>
						</div>
					</form>
				</Modal>
			</div>
		</React.Fragment>
	);
};

export default UpdatePasswordModal;
