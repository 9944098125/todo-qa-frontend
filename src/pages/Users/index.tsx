import React, { useEffect, useState } from "react";
import TabTitle from "../../utils/tab-title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getUsers } from "../../redux/actions/admin";
import UserItem from "./components/user-item";
import { AlertModal } from "../../components/ui/alert";
import GlobalButton from "../../components/ui/button";
import { Pagination } from "../../components/ui/pagination";
import { Link } from "react-router-dom";

export const Users = () => {
	const dispatch = useDispatch();

	const UsersState = useSelector((state: RootState) => state.admin);
	const AlertState = useSelector((state: RootState) => state.alert);
	const SearchState = useSelector((state: RootState) => state.search);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		dispatch(getUsers(currentPage, 10) as any);
	}, [dispatch, currentPage]);

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
				{SearchState?.query
					? SearchState.filteredItems.map((user) => {
							return (
								<div key={user?._id} className="col-span-12 md:col-span-6 lg:col-span-3">
									<UserItem
										name={user?.name}
										_id={user?._id}
										profilePicture={user?.profilePicture}
									/>
								</div>
							);
					  })
					: UsersState?.users?.map((user) => {
							return (
								<div key={user?._id} className="col-span-12 md:col-span-6 lg:col-span-3">
									<UserItem
										name={user?.name}
										_id={user?._id}
										profilePicture={user?.profilePicture}
									/>
								</div>
							);
					  })}
			</div>
			{/* Pagination Component */}
			{!SearchState?.query && UsersState?.pagination?.totalPages > 1 && (
				<Pagination
					currentPage={UsersState.pagination.pageNumber}
					totalPages={UsersState.pagination.totalPages}
					totalDocuments={UsersState.pagination.totalDocuments}
					pageSize={UsersState.pagination.pageSize}
					onPageChange={handlePageChange}
				/>
			)}
		</React.Fragment>
	);
};
