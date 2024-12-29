import React from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";

type Props = {
	toggle: () => void;
	showDropdown: boolean;
};
const UserAvatar = (props: Props) => {
	const { toggle, showDropdown } = props;

	const dropdownRef = React.useRef<HTMLDivElement>(null);

	useClickOutside(dropdownRef, toggle);

	return (
		<React.Fragment>
			<div
				onClick={toggle}
				ref={dropdownRef}
				className="h-[35px] w-[35px] rounded-full relative cursor-pointer">
				<img
					src="https://i.pinimg.com/736x/0e/9f/da/0e9fda9e52cdd4a6f439131db5ef0aac.jpg"
					alt=""
					className="h-full w-full rounded-full"
				/>
				{showDropdown && (
					<div className="absolute right-0 top-10 p-2 rounded-md">
						{/* link-items  */}
						<Link
							to="/profile"
							className="px-5 py-2 hover:bg-blue-100 rounded-md">
							Profile
						</Link>
						<div className="hover:bg-blue-100 rounded-md px-5 py-2">Logout</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default UserAvatar;
