import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/actions/theme";
import { RootState } from "../../redux/reducers";
import { logout } from "../../redux/actions/login";
import { Input } from "../ui/Input";
import { searchItems } from "../../redux/actions/search";

const Navbar = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const [showDropdown, setShowDropdown] = useState(false);
	const [search, setSearch] = useState("");

	const lightTheme = useSelector((state: RootState) => state.theme);
	const Users = useSelector((state: RootState) => state.admin.users);
	const TodoItems = useSelector((state: RootState) => state.todo.todoItems);
	const QaItems = useSelector((state: RootState) => state.qa.qaItems);
	const AdminState = useSelector((state: RootState) => state.admin);

	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") || "")
		: null;

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleThemeToggle = () => {
		dispatch(toggleTheme() as any);
	};

	const handleLogout = () => {
		dispatch(logout() as any);
		navigate("/login", { replace: true });
	};

	const dropdownRef = React.useRef<HTMLDivElement>(null);

	useClickOutside(dropdownRef, () => {
		setShowDropdown(false);
	});

	const handleSearch = (event: any) => {
		setSearch(event.target?.value);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (search) {
				if (location.pathname?.includes("users")) {
					dispatch(
						searchItems(
							Users?.filter((i) =>
								i?.name?.toLowerCase().includes(search.toLowerCase())
							)
						) as any
					);
				} else if (location.pathname?.includes("todo")) {
					dispatch(
						searchItems(
							TodoItems?.filter((i) =>
								i?.title.toLowerCase().includes(search.toLowerCase())
							)
						) as any
					);
				} else if (location.pathname?.includes("question")) {
					dispatch(
						searchItems(
							QaItems?.filter((i) =>
								i?.question.toLowerCase().includes(search.toLowerCase())
							)
						) as any
					);
				}
			} else {
				if (location.pathname?.includes("users")) {
					dispatch(searchItems(Users) as any); // Reset the filtered list to all users
				} else if (location.pathname?.includes("todo")) {
					dispatch(searchItems(TodoItems) as any); // Reset the filtered list to all todo items
				} else if (location.pathname?.includes("question")) {
					dispatch(searchItems(QaItems) as any); // Reset the filtered list to all QA items
				}
			}
		}, 300); // Adjust the delay as needed

		return () => clearTimeout(timeoutId);
	}, [search, location.pathname, Users, TodoItems, QaItems, dispatch]);

	return (
		<React.Fragment>
			<div
				className={`h-full w-full shadow-lg flex items-center justify-between px-5 border-b-4 border-b-blue-600 ${
					lightTheme?.dark ? "bg-black" : "bg-blue-50"
				}`}>
				{/* logo-container  */}
				<div
					id="logo-container"
					className="flex items-center space-x-5 px-5 py-1">
					<img src="/todo-logo.png" alt="" height={30} width={30} />
					<h5 className="font-medium text-[1rem] lg:text-[1.6rem] bg-gradient-to-r from-red-500 via-cyan-500 to-gray-500 text-transparent bg-clip-text">
						Todo QA
					</h5>
				</div>

				{/* search-container  */}
				<div className={`hidden md:block w-1/3 h-full py-2`}>
					<Input
						type="text"
						placeholder="Search"
						className={`p-2 font-poppins text-[14px] outline-blue-600 border font-medium ${
							lightTheme?.dark ? "bg-black text-white" : "bg-white"
						}`}
						onChange={handleSearch}
					/>
				</div>

				{/* toggle theme & user avatar container */}
				<div className="flex items-center space-x-5">
					{/* icons-container  */}
					{lightTheme?.dark ? (
						<div
							onClick={handleThemeToggle}
							className="h-[25px] w-[25px] cursor-pointer">
							<FaSun className="h-full w-full text-white" />
						</div>
					) : (
						<div
							onClick={handleThemeToggle}
							className="h-[25px] cursor-pointer w-[25px]">
							<FaMoon className="h-full w-full" />
						</div>
					)}
					{/* user avatar container */}
					<div
						onClick={toggleDropdown}
						ref={dropdownRef}
						className="h-[35px] w-[35px] rounded-full relative cursor-pointer">
						<img
							src={user ? user.profilePicture : "/images/avatar.png"}
							alt=""
							className="h-full w-full rounded-full"
						/>
						{showDropdown && (
							<div
								className={`absolute z-50 w-[10rem] py-2 right-0 top-10 rounded-md border border-blue-500 ${
									lightTheme.dark ? "bg-blue-700" : "bg-white"
								}`}>
								{/* link-items  */}
								<Link
									to="/profile"
									style={{ textDecoration: "none", color: "inherit" }}>
									<div
										className={`px-5 py-2 rounded-md ${
											lightTheme?.dark
												? "hover:bg-white hover:text-black hover:font-bold"
												: "hover:bg-gray-200 hover:font-bold"
										}`}>
										Profile
									</div>
								</Link>
								<div
									onClick={handleLogout}
									className={`px-5 py-2 rounded-md ${
										lightTheme?.dark
											? "hover:bg-white hover:text-black hover:font-bold"
											: "hover:bg-gray-200 hover:font-bold"
									}`}>
									Logout
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Navbar;
