import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterProps } from "../../utils/interfaces";
import RegistrationForm from "./components/registration-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { AlertModal } from "../../components/ui/alert";
import { register } from "../../redux/actions/register";
import { changeSuccess } from "../../redux/actions/success";

export const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const SuccessState = useSelector((state: RootState) => state.successReducer);
	const AlertState = useSelector((state: RootState) => state.alert);
	const RegisterState = useSelector((state: RootState) => state.register);
	const form = useForm();

	const {
		formState: { errors },
	} = form;

	const [image, setImage] = React.useState("");
	const [imageUploadLoading, setImageUploadLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const submitRegistrationForm = (data: Partial<RegisterProps>) => {
		if (data.password !== data.confirmPassword) {
			alert("Passwords does not match");
			return;
		}
		const body = {
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone,
			bio: data.bio,
			profilePicture: image,
			isAdmin: false,
		};
		dispatch(register(body) as any);
	};

	useEffect(() => {
		if (RegisterState?.success && SuccessState?.success) {
			navigate("/login");
			dispatch(changeSuccess() as any);
		}
	}, [navigate, RegisterState?.success, SuccessState.success, dispatch]);

	const changeImage = async (file: File | null) => {
		setImageUploadLoading(true);
		if (file === null) {
			return;
		} else if (
			file.type === "image/jpeg" ||
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

	return (
		<React.Fragment>
			{AlertState?.message && <AlertModal show={true} />}
			<div
				style={{ backgroundImage: "url(/images/registration-bg.avif)" }}
				className="bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center lg:justify-start lg:items-start p-6 opacity-[0.5]">
				{/* translucent bg  */}
				<div className="bg-white p-5 rounded-md w-full lg:w-2/3">
					<h1 className="text-xl font-medium font-poppins mb-4">
						Registration
					</h1>
					<p className="text-red-500 text-xs font-poppins">
						Already have an account ? Please{" "}
						<Link
							to="/login"
							style={{
								textDecoration: "none",
								color: "blue",
								fontWeight: "bold",
							}}>
							Login
						</Link>
					</p>
					<RegistrationForm
						form={form}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						showConfirmPassword={showConfirmPassword}
						setShowConfirmPassword={setShowConfirmPassword}
						errors={errors}
						submitRegistrationForm={submitRegistrationForm}
						changeImage={changeImage}
						uploading={imageUploadLoading}
						image={image}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
