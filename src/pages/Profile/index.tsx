import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import ProfileImage from "./components/profile-image";
import DetailsForm from "./components/details-form";
import { AlertModal } from "../../components/ui/alert";
import TabTitle from "../../utils/tab-title";
import { useNavigate } from "react-router-dom";
import UpdatePasswordModal from "../../components/parts/update-password-modal";
import GlobalButton from "../../components/ui/button";
import { RiKey2Fill } from "react-icons/ri";

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const ProfileDetails = useSelector((state: RootState) => state.profile);
	const AlertState = useSelector((state: RootState) => state.alert);

	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") || "null")
		: null;

	const [image, setImage] = useState("");
	const [imageUploadLoading, setImageUploadLoading] = useState(false);
	const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

	const handleSubmitImageUpload = () => {
		const body = {
			profilePicture: image,
		};
		// console.log("image", image);
		dispatch(updateProfile(body, user?._id) as any);
		setImage("");
	};

	const changeImage = async (file: File | null) => {
		setImageUploadLoading(true);
		if (file === null) {
			return;
		} else if (
			file?.type === "image/jpeg" ||
			"image/jpg" ||
			"image/png" ||
			"image.svg" ||
			"image/gfif"
		) {
			const imgData = new FormData();
			imgData.append("file", file);
			imgData.append("upload_preset", "save_qa");
			imgData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
				method: "POST",
				body: imgData,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setImage(data.url);
					setImageUploadLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	};

	useEffect(() => {
		if (image) {
			handleSubmitImageUpload();
		}
	}, [image]);

	useEffect(() => {
		dispatch(getProfile(user?._id) as any);
	}, [user?._id, dispatch, ProfileDetails?.toggler]);

	useEffect(() => {
		if (!localStorage.getItem("asp-todo-qa-user")) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<React.Fragment>
			<TabTitle title="Profile" />
			{AlertState?.message && <AlertModal show={true} />}
			<div className="w-full min-h-screen">
				<div className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:space-x-5">
					<div className="w-full flex justify-center items-center lg:w-1/3">
						<ProfileImage
							imageUploadLoading={imageUploadLoading}
							changeImage={changeImage}
							profilePicture={
								ProfileDetails?.profile?.user?.profilePicture || image
							}
							isAdmin={ProfileDetails?.profile?.user?.isAdmin}
						/>
					</div>
					<DetailsForm
						profileDetails={ProfileDetails?.profile?.user}
						loading={ProfileDetails?.isLoading}
						success={ProfileDetails?.toggler}
					/>
				</div>
				<GlobalButton
					variant="BLUE"
					type="button"
					onClick={() => setShowUpdatePasswordModal(true)}>
					<p className="text-md">Update Password</p>
					<RiKey2Fill />
				</GlobalButton>
				{showUpdatePasswordModal && (
					<UpdatePasswordModal
						show={showUpdatePasswordModal}
						setShow={setShowUpdatePasswordModal}
						userId={ProfileDetails?.profile.user?._id}
					/>
				)}
			</div>
		</React.Fragment>
	);
};
