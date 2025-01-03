import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

const AppLayout = () => {
	const theme = useSelector((state: RootState) => state.theme);
	const SidebarToggler = useSelector((state: RootState) => state.sidebar);

	return (
		<React.Fragment>
			<div
				className={`w-full ${
					theme.dark ? "bg-black text-white" : "bg-blue-50"
				}`}>
				<div className="h-[60px]">
					<Navbar />
				</div>
				<div className="flex">
					{/* Sidebar */}
					<div
						className={`outlet-height border-r-4 border-r-blue-600 shadow-lg transition-all duration-500 ${
							SidebarToggler?.open ? "w-[250px]" : "w-[60px]"
						}`}>
						<Sidebar />
					</div>

					{/* Outlet Content */}
					<div
						id="outlet"
						className="outlet-height pl-2 md:pl-4 pt-10 overflow-y-scroll flex-grow transition-all duration-500">
						<Outlet />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AppLayout;
