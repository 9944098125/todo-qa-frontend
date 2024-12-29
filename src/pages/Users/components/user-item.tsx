import React from "react";
import { ImageLazyLoad } from "../../../components/image-lazyload/Loadable";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { Link, useNavigate } from "react-router-dom";

type Props = {
	name: string;
	profilePicture: string;
	_id: string;
};
const UserItem = (props: Props) => {
	const { name, profilePicture, _id } = props;
	const navigate = useNavigate();
	const ThemeState = useSelector((state: RootState) => state.theme);
	return (
		<React.Fragment>
			<div
				onClick={() => navigate(`/users/${_id}`)}
				className="flex flex-col items-center cursor-pointer">
				<div
					className={`border-2 border-${
						ThemeState.dark ? "white" : "blue-600"
					} p-4 mb-4 rounded-full`}>
					<ImageLazyLoad
						image={profilePicture}
						className="rounded-full h-[150px] lg:h-[250px] w-[150px] lg:w-[250px] object-cover"
					/>
				</div>
				<p
					className={`text-center text-[16px] font-poppins font-medium text-${
						ThemeState.dark ? "white" : "blue-600"
					}`}>
					{name}
				</p>
			</div>
		</React.Fragment>
	);
};

export default UserItem;
