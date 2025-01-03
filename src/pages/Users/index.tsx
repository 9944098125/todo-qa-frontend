import React, { useEffect } from "react";
import TabTitle from "../../utils/tab-title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getUsers } from "../../redux/actions/admin";
import UserItem from "./components/user-item";
import { AlertModal } from "../../components/ui/alert";
import GlobalButton from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const admin = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") || "null")
		: null;

	const UsersState = useSelector((state: RootState) => state.admin);
	const AlertState = useSelector((state: RootState) => state.alert);
	const SearchState = useSelector((state: RootState) => state.search);

	console.log("filtered", SearchState.filteredItems);

	useEffect(() => {
		dispatch(getUsers() as any);
	}, []);

	return (
		<React.Fragment>
			<TabTitle title="Users" />
			{AlertState.message && <AlertModal show={true} />}
			<div className="h-20 w-full flex items-center justify-end px-5">
				<Link
					to="/users/add-user"
					style={{ textDecoration: "none", color: "inherit" }}>
					<GlobalButton type="button" variant="BLUE">
						+ Add User
					</GlobalButton>
				</Link>
			</div>
			<div className="grid grid-cols-12 gap-4">
				{SearchState?.filteredItems.length > 0
					? SearchState.filteredItems?.map((user) => {
							return (
								<div className="col-span-12 md:col-span-6 lg:col-span-3">
									<UserItem
										key={user?._id}
										name={user?.name}
										_id={user?._id}
										profilePicture={user?.profilePicture}
									/>
								</div>
							);
					  })
					: UsersState?.users?.map((user) => {
							return (
								<div className="col-span-12 md:col-span-6 lg:col-span-3">
									<UserItem
										key={user?._id}
										name={user?.name}
										_id={user?._id}
										profilePicture={user?.profilePicture}
									/>
								</div>
							);
					  })}
			</div>
		</React.Fragment>
	);
};
