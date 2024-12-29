import React from "react";
import { ImageLazyLoad } from "../../../components/image-lazyload/Loadable";
import { Input } from "../../../components/ui/Input";
import Loader from "../../../components/ui/Loader";

type Props = {
	profilePicture: string;
	isAdmin?: boolean;
	changeImage: (file: File | null) => void;
	imageUploadLoading: boolean;
};

const UserImage = (props: Props) => {
	const { profilePicture, isAdmin, imageUploadLoading, changeImage } = props;

	return (
		<React.Fragment>
			<div>
				{/* Profile Picture with Lazy Load */}
				<label className="cursor-pointer" htmlFor="profilePicture">
					<div className="p-4 border-2 border-blue-600 rounded-full">
						{imageUploadLoading ? (
							<Loader color="blue" />
						) : (
							<ImageLazyLoad
								image={profilePicture}
								className="rounded-full h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]"
							/>
						)}
						<Input
							onChange={(e: any) => changeImage(e.target?.files?.[0])}
							type="file"
							id="profilePicture"
							style={{ display: "none" }}
						/>
					</div>
				</label>

				{/* Admin Badge */}
				{isAdmin && (
					<div className="border-2 rounded-full p-4 w-fit border-blue-600">
						<p className="text-blue-600 font-poppins font-semibold text-lg">
							Admin
						</p>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default UserImage;
