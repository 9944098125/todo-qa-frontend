import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import UserImage from "./components/user-image";
import UserDetails from "./components/user-details";
import { AlertModal } from "../../components/ui/alert";
import TabTitle from "../../utils/tab-title";
import { getUserById, updateUser } from "../../redux/actions/admin";
import { useNavigate, useParams } from "react-router-dom";
import GlobalButton from "../../components/ui/button";
import { RiKey2Fill, RiQuestionAnswerFill, RiTodoFill } from "react-icons/ri";
import UpdatePasswordModal from "../../components/parts/update-password-modal";

export const UserDetailsPage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// console.log(userId);

	const UserDetailsState = useSelector((state: RootState) => state.admin);
	const AlertState = useSelector((state: RootState) => state.alert);

	const [image, setImage] = useState("");
	const [imageUploadLoading, setImageUploadLoading] = useState(false);
	const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

	const handleSubmitImageUpload = () => {
		const body = {
			profilePicture: image,
		};
		// console.log("image", image);
		dispatch(updateUser(userId!, body) as any);
		setImage("");
	};

	const changeImage = async (file: File | null) => {
		setImageUploadLoading(true);
		if (file === null) {
			return;
		} else if (
			file?.type === "image/jpeg" ||
			file?.type === "image/jpg" ||
			file?.type === "image/png" ||
			file?.type === "image/svg+xml" ||
			file?.type === "image/gif"
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
		dispatch(getUserById(userId!) as any);
	}, [userId, dispatch, UserDetailsState?.user?.profilePicture]);

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
						<UserImage
							imageUploadLoading={imageUploadLoading}
							changeImage={changeImage}
							profilePicture={UserDetailsState?.user?.profilePicture || image}
							isAdmin={UserDetailsState?.user?.isAdmin}
						/>
					</div>
					<UserDetails
						userDetails={UserDetailsState?.user}
						loading={UserDetailsState?.isLoading}
						success={UserDetailsState?.toggler}
					/>
				</div>
				<div className="flex items-center justify-center space-x-5 pb-5">
					<GlobalButton
						onClick={() => navigate(`/user/todo-items/${userId}`)}
						variant="BLUE">
						<div className="text-center md:flex items-center space-x-2">
							<p className="font-medium font-poppins hidden md:block">
								Go To {UserDetailsState?.user?.name}'s TODO
							</p>
							<RiTodoFill className="font-medium" />
						</div>
					</GlobalButton>

					<GlobalButton
						onClick={() => navigate(`/user/qa-items/${userId}`)}
						variant="BLUE">
						<div className="flex items-center space-x-2">
							<p className="font-medium font-poppins hidden md:block">
								Go To {UserDetailsState?.user?.name}'s QA
							</p>
							<RiQuestionAnswerFill className="font-medium" />
						</div>
					</GlobalButton>

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
							userId={UserDetailsState?.user?._id}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
