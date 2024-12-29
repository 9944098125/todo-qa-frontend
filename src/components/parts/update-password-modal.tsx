import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { RootState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import GlobalButton from "../ui/button";
import { RiCloseCircleFill } from "react-icons/ri";
import { updatePassword } from "../../redux/actions/login";
import Loader from "../ui/Loader";
import PasswordInput from "../../pages/Registration/components/password-input";

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

	const getResponsiveStyles = () => {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 700) {
			return {
				width: "90%",
			};
		} else if (screenWidth <= 1240) {
			return {
				width: "60%",
			};
		} else {
			return {
				width: "50%",
			};
		}
	};

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			transform: "translate(-50%, -50%)",
			padding: "20px",
			borderRadius: "10px",
			color: ThemeState.dark ? "white" : "black",
			backgroundColor: ThemeState.dark ? "black" : "white",
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
			...getResponsiveStyles(), // Apply responsive width initially
		},
	};

	const [modalStyles, setModalStyles] = useState(customStyles);
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

	// Function to dynamically update modal width based on screen size
	const updateModalStyles = () => {
		setModalStyles({
			...customStyles,
			content: {
				...customStyles.content,
				...getResponsiveStyles(),
			},
		});
	};

	// Add resize listener to update modal styles
	useEffect(() => {
		updateModalStyles(); // Set initial styles
		window.addEventListener("resize", updateModalStyles);
		return () => window.removeEventListener("resize", updateModalStyles);
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent form submission
		}
	};

	return (
		<React.Fragment>
			<div className="w-full">
				<Modal
					onRequestClose={() => setShow(false)}
					isOpen={show}
					shouldCloseOnOverlayClick={false}
					style={modalStyles}>
					<form
						onKeyDown={handleKeyDown}
						onSubmit={form.handleSubmit(submitUpdatePassword)}>
						<div className="w-full p-2">
							<div className="w-full flex items-center justify-between p-4">
								<h4 className="text-2xl font-medium font-poppins">
									Update Password
								</h4>
								<button
									onClick={() => setShow(false)}
									className="bg-transparent hover:border border-blue-600 rounded-full p-2">
									<RiCloseCircleFill fontSize={25} />
								</button>
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
