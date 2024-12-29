import React, { useEffect, useState } from "react";
import { Input } from "../../../components/ui/Input";
import { useForm } from "react-hook-form";
import Label from "../../../components/ui/Label";
import GlobalButton from "../../../components/ui/button";
import { RiDeleteBin3Fill, RiEdit2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteProfile, updateProfile } from "../../../redux/actions/profile";
import Loader from "../../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/login";
import ConfirmationModal from "../../../components/parts/confirmation-modal";

type Props = {
	profileDetails: {
		_id: string;
		name: string;
		profilePicture: string;
		email: string;
		phone: string;
		bio: string;
	};
	loading: boolean;
	success: boolean;
};
const DetailsForm = (props: Props) => {
	const navigate = useNavigate();
	const { profileDetails, loading, success } = props;
	const form = useForm();
	const dispatch = useDispatch();

	const [editForm, setEditForm] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const submitProfileForm = (data: any) => {
		dispatch(updateProfile(data, profileDetails?._id) as any);
	};

	const deleteAccount = () => {
		dispatch(deleteProfile(profileDetails?._id) as any);
		dispatch(logout() as any);
		navigate("/login", { replace: true });
	};

	useEffect(() => {
		setEditForm(false);
	}, [success]);

	useEffect(() => {
		if (profileDetails) {
			form.setValue("name", profileDetails?.name);
			form.setValue("email", profileDetails?.email);
			form.setValue("phone", profileDetails?.phone);
			form.setValue("bio", profileDetails?.bio);
		}
	}, [profileDetails, form]);

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
							className={`rounded-lg ${
								editForm
									? "outline-blue-600 bg-transparent"
									: "outline-none bg-transparent"
							}`}
							type="text"
							{...form.register("name", {
								required: "Please Enter Your Name !",
							})}
							placeholder="Enter your Name"
							readOnly={!editForm}
							id="name"
						/>
					</div>

					<div className="mb-4">
						<Label htmlFor="email" label="Email" />
						<Input
							className={`rounded-lg ${
								editForm
									? "outline-blue-600 bg-transparent"
									: "outline-none bg-transparent"
							}`}
							type="text"
							{...form.register("email", {
								required: "Please Enter Your Email Address !",
							})}
							placeholder="Enter your Email Address"
							readOnly={!editForm}
							id="email"
						/>
					</div>

					<div className="mb-4">
						<Label htmlFor="phone" label="Phone" />
						<Input
							className={`rounded-lg ${
								editForm
									? "outline-blue-600 bg-transparent"
									: "outline-none bg-transparent"
							}`}
							type="text"
							{...form.register("phone", {
								required: "Please Enter Your Phone !",
							})}
							placeholder="Enter your Phone Number"
							readOnly={!editForm}
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
							readOnly={!editForm}
							className={`rounded-lg w-full p-4 ${
								editForm
									? "outline-blue-600 bg-transparent"
									: "outline-none bg-transparent"
							}`}
							id="bio"
						/>
					</div>
					<div className="flex items-center space-x-5 justify-end">
						{editForm && (
							<div className="flex items-center justify-end">
								<GlobalButton type="submit" variant="BLUE">
									Save {loading && <Loader color="white" />}
								</GlobalButton>
							</div>
						)}
						{!editForm && (
							<GlobalButton
								onClick={() => setEditForm(true)}
								variant="OUTLINED"
								type="button">
								<RiEdit2Fill fontSize={25} className="text-blue-600" />
								<p className="text-blue-600 text-md font-poppins font-semibold">
									Edit
								</p>
							</GlobalButton>
						)}
						<GlobalButton
							type="button"
							variant="DESTRUCTIVE"
							onClick={() => setShowConfirmationModal(true)}>
							<RiDeleteBin3Fill fontSize={25} className="text-white" />
							<p className="text-white font-poppins font-medium text-md">
								Delete
							</p>
						</GlobalButton>
					</div>
					{showConfirmationModal && (
						<ConfirmationModal
							message="Are you sure you want to delete your account ?"
							onClose={() => setShowConfirmationModal(false)}
							onConfirm={deleteAccount}
							show={showConfirmationModal}
							loading={loading}
						/>
					)}
				</form>
			</div>
		</React.Fragment>
	);
};

export default DetailsForm;
