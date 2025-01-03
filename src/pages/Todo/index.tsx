import React, { useEffect, useState } from "react";
import { AddEditModal } from "../../components/parts/add-edit-modal";
import GlobalButton from "../../components/ui/button";
import { RiTodoFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import TodoItem from "../../components/parts/todo-item";
import { Accordion } from "react-accessible-accordion";
import { formatDate } from "../../utils/date-formatter";
import { AlertModal } from "../../components/ui/alert";
import { useForm } from "react-hook-form";
import {
	createTodo,
	deleteTodo,
	generateTodoDesc,
	getTodoListWithUserId,
	updateTodo,
} from "../../redux/actions/todo";
import { useNavigate } from "react-router-dom";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Todo = () => {
	const form = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [modalHead, setModalHead] = useState<string>("");
	const [todoId, setTodoId] = useState<string>("");

	const AlertState = useSelector((state: RootState) => state.alert);
	const TodoState = useSelector((state: RootState) => state.todo);
	const SearchState = useSelector((state: RootState) => state.search);

	const [showTodoModal, setShowTodoModal] = useState<boolean>(false);
	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDesc, setTodoDesc] = useState<{
		rawData: string | undefined;
		formattedData: string | undefined;
	}>();
	const [urgency, setUrgency] = useState<boolean>(false);
	const [date, setDate] = useState<Value>(new Date());

	const handleDescriptionChange = (value: string) => {
		setTodoDesc({
			rawData: value.replace(/<[^>]*>?/gm, ""), // Removes all HTML tags for plain text
			formattedData: value, // Keeps the formatted HTML
		});
	};

	const user = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") as string)
		: null;

	const submitAddTodoForm = (event: any) => {
		event?.preventDefault();
		const body = {
			title: todoTitle,
			description: todoDesc?.formattedData,
			deadline: date?.toString() || "",
			urgency: urgency,
			userId: user?._id,
		};
		// console.log("formattedData", todoDesc?.formattedData);
		if (modalHead === "Add Todo") {
			dispatch(createTodo(body as any) as any);
		} else {
			dispatch(updateTodo(body as any, todoId as string) as any);
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
			const updatingTodo = TodoState?.todoItems?.find(
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

	const deleteOwnTodo = (id: string) => {
		setTodoId(id);
		if (todoId) {
			dispatch(deleteTodo(todoId as string, user?._id) as any);
		}
	};

	useEffect(() => {
		if (TodoState?.success) {
			setShowTodoModal(false);
			form.reset();
			setDate(null);
			setTodoDesc({ rawData: "", formattedData: "" });
		}
	}, [TodoState?.success, AlertState.message]);

	useEffect(() => {
		dispatch(getTodoListWithUserId(user?._id) as any);
	}, [dispatch, user?._id, TodoState?.success, AlertState?.message]);

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
					isLoading={TodoState?.isLoading}
					handleDescriptionChange={handleDescriptionChange}
					generateDesc={generateTodoDescription}
				/>
				<Accordion className="rounded-lg" autoCapitalize="words">
					{SearchState?.filteredItems?.length > 0
						? SearchState.filteredItems?.map((item) => {
								return (
									<TodoItem
										_id={item?._id}
										title={item?.title}
										description={item?.description}
										deadline={formatDate(item?.deadline || "12/12/12")}
										urgency={item?.urgency}
										editTodo={editTodo}
										deleteTodo={deleteOwnTodo}
										setModalHead={setModalHead}
										isLoading={TodoState?.isLoading}
									/>
								);
						  })
						: TodoState?.todoItems?.map((item) => {
								return (
									<TodoItem
										_id={item?._id}
										title={item?.title}
										description={item?.description}
										deadline={formatDate(item?.deadline || "12/12/12")}
										urgency={item?.urgency}
										editTodo={editTodo}
										deleteTodo={deleteOwnTodo}
										setModalHead={setModalHead}
										isLoading={TodoState?.isLoading}
									/>
								);
						  })}
				</Accordion>
			</div>
		</React.Fragment>
	);
};
