import { FaQuestion, FaUsersGear } from "react-icons/fa6";
import { RiTodoFill } from "react-icons/ri";

export const adminItems = [
	{
		name: "Users",
		path: "/users",
		icon: FaUsersGear,
	},
	{
		name: "Todo Items",
		path: "/todo-items",
		icon: RiTodoFill,
	},
	{
		name: "Questions/Answers",
		path: "/questions-answers",
		icon: FaQuestion,
	},
];

export const userItems = [
	{
		name: "Todo Items",
		path: "/todo-items",
		icon: RiTodoFill,
	},
	{
		name: "Questions/Answers",
		path: "/questions-answers",
		icon: FaQuestion,
	},
];
