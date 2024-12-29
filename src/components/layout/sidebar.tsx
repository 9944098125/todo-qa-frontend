import React from "react";
import { adminItems, userItems } from "../ui/sidebar-link-items";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { sidebar } from "../../redux/actions/sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Sidebar = () => {
	const dispatch = useDispatch();

	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") as string)
		: null;

	const SidebarToggler = useSelector((state: RootState) => state.sidebar);

	const toggleSidebar = () => {
		dispatch(sidebar() as any);
	};

	return (
		<React.Fragment>
			<div className="w-full h-full relative">
				{/* toggle sidebar container */}
				<div className="hidden lg:block w-full h-[50px] mb-5">
					{SidebarToggler.open ? (
						<div
							onClick={toggleSidebar}
							className="border hover:bg-blue-100 text-blue-700 cursor-pointer font-medium border-blue-700 rounded-md w-[50px] h-[50px] flex items-center justify-center absolute right-1 top-2">
							<FaArrowLeft />
						</div>
					) : (
						<div
							onClick={toggleSidebar}
							className="border hover:bg-blue-100 text-blue-700 cursor-pointer font-medium border-blue-700 rounded-md w-[50px] h-[50px] flex items-center justify-center absolute left-1 top-2">
							<FaArrowRight />
						</div>
					)}
				</div>
				<div className={`pt-2 pr-2`}>
					{user?.isAdmin
						? adminItems?.map((item, idx) => {
								return (
									<NavLink
										key={idx}
										to={item.path}
										className={({ isActive }) =>
											`${
												isActive &&
												"border-l-4 border-l-blue-700 bg-blue-100 text-blue-700 rounded-tr-md rounded-br-md"
											} w-full flex items-center space-x-5 py-4 hover:underline ${
												!SidebarToggler?.open && isActive
													? "pl-[6px]"
													: "pl-[14px]"
											}`
										}>
										{item?.icon && (
											<item.icon className="text-[25px] font-bold" />
										)}
										<div
											className={`text-[12px] font-semibold ${
												SidebarToggler?.open ? "block" : "hidden"
											}`}>
											{item.name}
										</div>
									</NavLink>
								);
						  })
						: userItems?.map((item, idx) => {
								return (
									<NavLink
										key={idx}
										to={item.path}
										className={({ isActive }) =>
											`${
												isActive &&
												"border-l-4 border-l-blue-700 bg-blue-100 text-blue-700 rounded-tr-md rounded-br-md"
											} w-full flex items-center space-x-5 py-4 hover:underline ${
												!SidebarToggler?.open && isActive
													? "pl-[6px]"
													: "pl-[14px]"
											}`
										}>
										{item?.icon && (
											<item.icon className="text-[25px] font-bold" />
										)}
										<div
											className={`text-[12px] font-semibold ${
												SidebarToggler?.open ? "block" : "hidden"
											}`}>
											{item.name}
										</div>
									</NavLink>
								);
						  })}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Sidebar;
