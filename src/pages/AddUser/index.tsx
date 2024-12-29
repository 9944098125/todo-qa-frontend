import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./components/user-image";
import UserDetails from "./components/user-details";
import { AlertModal } from "../../components/ui/alert";
import { RootState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(userId);

	const UserDetailsState = useSelector((state: RootState) => state.admin);
	const AlertState = useSelector((state: RootState) => state.alert);

	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") || "null")
		: null;

	const [image, setImage] = useState("");
	const [imageUploadLoading, setImageUploadLoading] = useState(false);

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
		if (!localStorage.getItem("asp-todo-qa-user")) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<React.Fragment>
			{AlertState?.message && <AlertModal show={true} />}
			<h5 className="text-2xl font-poppins font-medium">Add a User</h5>
			<div className="w-full min-h-screen">
				<div className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:space-x-5">
					<div className="w-full flex justify-center items-center lg:w-1/3">
						<UserImage
							imageUploadLoading={imageUploadLoading}
							changeImage={changeImage}
							profilePicture={image}
						/>
					</div>
					<UserDetails
						image={image}
						loading={UserDetailsState?.isLoading}
						success={UserDetailsState?.success}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
