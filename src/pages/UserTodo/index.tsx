import React, { useEffect, useState } from "react";
import { AddEditModal } from "../../components/parts/add-edit-modal";
import GlobalButton from "../../components/ui/button";
import { RiTodoFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
	createTodoForUser,
	deleteTodoOfUser,
	getTodoOfUser,
	updateTodoForUser,
} from "../../redux/actions/admin";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import TodoItem from "../../components/parts/todo-item";
import { Accordion } from "react-accessible-accordion";
import { formatDate } from "../../utils/date-formatter";
import { AlertModal } from "../../components/ui/alert";
import { useForm } from "react-hook-form";
import { generateTodoDesc } from "../../redux/actions/todo";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const UserTodo = () => {
	const form = useForm();
	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [modalHead, setModalHead] = useState<string>("");

	const [todoId, setTodoId] = useState<string>("");

	const AdminTodo = useSelector((state: RootState) => state.admin);
	const AlertState = useSelector((state: RootState) => state.alert);

	const TodoState = useSelector((state: RootState) => state.todo);

	const [showTodoModal, setShowTodoModal] = useState<boolean>(false);
	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDesc, setTodoDesc] = useState<{
		rawData: string | undefined;
		formattedData: string | undefined;
	}>();
	const [urgency, setUrgency] = useState<boolean>(false);
	const [date, setDate] = useState<Value>(new Date());

	// const handleDescriptionChange = (
	// 	inputData: any,
	// 	delta: any,
	// 	source: any,
	// 	editor: any
	// ) => {
	// 	setTodoDesc({ formattedData: inputData, rawData: editor?.getText() });
	// };

	const handleDescriptionChange = (value: string) => {
		setTodoDesc({
			rawData: value.replace(/<[^>]*>?/gm, ""), // Removes all HTML tags for plain text
			formattedData: value, // Keeps the formatted HTML
		});
	};

	const admin = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") as string)
		: null;

	const submitAddTodoForm = (event: any) => {
		event?.preventDefault();
		const body = {
			title: todoTitle,
			description: todoDesc?.formattedData,
			deadline: date?.toString() || "",
			urgency: urgency,
		};
		console.log("formattedData", todoDesc?.formattedData);
		if (modalHead === "Add Todo") {
			dispatch(createTodoForUser(body, userId as string, admin?._id) as any);
		} else {
			dispatch(
				updateTodoForUser(
					body,
					userId as string,
					todoId as string,
					admin?._id
				) as any
			);
		}
	};

	const generateTodoDescription = () => {
		dispatch(generateTodoDesc(todoTitle as string) as any);
	};

	useEffect(() => {
		if (TodoState?.aiDesc) {
			setTodoDesc({
				rawData: TodoState?.aiDesc,
				formattedData: TodoState?.aiDesc,
			});
		}
	}, [TodoState?.aiDesc]);

	const editTodo = (id: string) => {
		setShowTodoModal(true);
		setTodoId(id);
		if (id) {
			const updatingTodo = AdminTodo?.todoItems?.find(
				(item: any) => item?._id === id
			);
			if (updatingTodo) {
				setTodoDesc({
					rawData: updatingTodo?.description,
					formattedData: updatingTodo?.description,
				});
				setDate(updatingTodo.deadline as any);
				setTodoTitle(updatingTodo.title || "");
				setUrgency(updatingTodo.urgency || false);
			}
		}
	};

	const deleteTodo = (id: string) => {
		setTodoId(id);
		if (todoId) {
			dispatch(
				deleteTodoOfUser(userId as string, todoId as string, admin?._id) as any
			);
		}
	};

	useEffect(() => {
		if (AdminTodo?.success) {
			setShowTodoModal(false);
			form.reset();
			setDate(null);
			setTodoDesc({ rawData: "", formattedData: "" });
		}
	}, [AdminTodo?.success, AlertState.message]);

	useEffect(() => {
		dispatch(getTodoOfUser(userId as string, admin?._id) as any);
	}, [dispatch, userId, admin?._id, AdminTodo?.success, AlertState?.message]);

	useEffect(() => {
		if (!localStorage.getItem("asp-todo-qa-user")) {
			navigate("/login");
		}
	}, [navigate]);

	useEffect(() => {
		if (modalHead === "Add Todo") {
			setTodoTitle("");
			setTodoDesc({
				rawData: "",
				formattedData: "",
			});
			setUrgency(false);
			setDate(null);
		}
	}, [showTodoModal]);

	return (
		<React.Fragment>
			{AlertState?.message && <AlertModal show={true} />}
			<div className="w-full min-h-screen">
				<div className="flex items-center justify-end">
					<GlobalButton
						onClick={() => {
							setShowTodoModal(true);
							setModalHead("Add Todo");
						}}
						variant="BLUE">
						<p className="text-md font-medium font-poppins">Add Todo</p>
						<RiTodoFill className="text-md font-bold" />
					</GlobalButton>
				</div>
				<AddEditModal
					show={showTodoModal}
					setShow={setShowTodoModal}
					title={modalHead}
					submitTodo={submitAddTodoForm}
					todoTitle={todoTitle}
					setTodoTitle={setTodoTitle}
					urgency={urgency}
					setUrgency={setUrgency}
					todoDesc={todoDesc?.formattedData}
					setTodoDesc={setTodoDesc}
					date={date}
					setDate={setDate}
					isLoading={AdminTodo?.isLoading}
					handleDescriptionChange={handleDescriptionChange}
					generateDesc={generateTodoDescription}
				/>
				<div className="p-2 md:p-5">
					<Accordion className="rounded-lg" autoCapitalize="words">
						{AdminTodo?.todoItems?.map((item) => {
							return (
								<TodoItem
									_id={item?._id}
									title={item?.title}
									description={item?.description}
									deadline={formatDate(item?.deadline || "12/12/12")}
									urgency={item?.urgency}
									editTodo={editTodo}
									deleteTodo={deleteTodo}
									setModalHead={setModalHead}
									isLoading={AdminTodo?.isLoading}
								/>
							);
						})}
					</Accordion>
				</div>
			</div>
		</React.Fragment>
	);
};
