import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/layout";
import { Login } from "../pages/Login/Loadable";
import { NotFound } from "../pages/NotFound/Loadable";
import { Unauthorized } from "../pages/Unauthorized/Loadable";
import { Users } from "../pages/Users/Loadable";
import { Profile } from "../pages/Profile/Loadable";
import { Home } from "../pages/Home/Loadable";
import { UserDetailsPage } from "../pages/UserDetails/Loadable";
import { UserTodo } from "../pages/UserTodo/Loadable";
import { AddUser } from "../pages/AddUser/Loadable";
import { UserQa } from "../pages/UserQa/Loadable";
import { Todo } from "../pages/Todo/Loadable";
import { Qa } from "../pages/Qa/Loadable";
import { RegistrationPage } from "../pages/Registration/Loadable";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <RegistrationPage />,
	},
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/users",
				element: <Users />,
			},
			{
				path: "/users/:userId",
				element: <UserDetailsPage />,
			},
			{
				path: "/users/add-user",
				element: <AddUser />,
			},
			{
				path: "/todo-items",
				element: <Todo />,
			},
			{
				path: "/questions-answers",
				element: <Qa />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/user/todo-items/:userId",
				element: <UserTodo />,
			},
			{
				path: "/user/qa-items/:userId",
				element: <UserQa />,
			},
			{
				path: "/unauthorized",
				element: <Unauthorized />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default function BaseRoutes() {
	return <RouterProvider router={router} />;
}
