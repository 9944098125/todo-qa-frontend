import React, { useState, useEffect } from "react";
import { RiCloseCircleFill, RiTodoFill } from "react-icons/ri";
import { Modal } from "react-responsive-modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-responsive-modal/styles.css";

import { Input } from "../ui/Input";
import Label from "../ui/Label";
import GlobalButton from "../ui/button";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import AiButton from "../ui/ai-button";

type Props = {
	show: any;
	setShow: any;
	title: string;
	submitTodo?: any;
	todoDesc?: any;
	setTodoDesc?: any;
	date?: any;
	setDate?: any;
	isLoading: boolean;
	todoTitle?: string;
	setTodoTitle?: any;
	urgency?: boolean;
	setUrgency?: any;
	handleDescriptionChange?: any;
	submitQa?: any;
	qa?: boolean;
	question?: any;
	setQuestion?: any;
	answer?: any;
	setAnswer?: any;
	handleAnswerChange?: any;
	importance?: string;
	setImportance?: (value: string | any) => void;
	generateDesc?: () => void;
};

export const AddEditModal = (props: Props) => {
	const {
		show,
		setShow,
		title,
		submitTodo,
		todoDesc,
		setTodoDesc,
		date,
		setDate,
		isLoading,
		todoTitle,
		setTodoTitle,
		urgency,
		setUrgency,
		handleDescriptionChange,
		submitQa,
		qa,
		question,
		setQuestion,
		answer,
		setAnswer,
		handleAnswerChange,
		setImportance,
		importance,
		generateDesc,
	} = props;

	const ThemeState = useSelector((state: RootState) => state.theme);

	const getResponsiveStyles = () => {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 700) {
			return {
				width: "90%",
			};
		} else if (screenWidth <= 1240) {
			return {
				width: "60%",
			};
		} else {
			return {
				width: "50%",
			};
		}
	};

	const closeIcon = (
		<div className="border-blue-600 border rounded-full p-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none">
				<path
					d="M18 6L6 18M6 6L18 18"
					stroke="#667085"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	);

	return (
		<React.Fragment>
			<div className="w-full md:w-1/2">
				<Modal
					styles={{
						modal: {
							backgroundColor: ThemeState.dark ? "black" : "",
							color: ThemeState.dark ? "white" : "",
							border: "1px #0096FF solid",
							borderRadius: "9px",
							width: "95%",
						},
					}}
					open={show}
					closeIcon={closeIcon}
					onClose={() => setShow(false)}
					center>
					<div className="w-full">
						<div className="w-full flex items-center justify-between p-4">
							<h4 className="text-2xl font-medium font-poppins">{title}</h4>
							{/* <button
								onClick={() => setShow(false)}
								className="bg-transparent hover:border border-blue-600 rounded-full p-2">
								<RiCloseCircleFill fontSize={25} />
							</button> */}
						</div>
						{/* add/edit todo form  */}
						{!qa ? (
							<form onSubmit={submitTodo}>
								<div className="p-2 mb-4">
									<Label htmlFor="title" label="Todo Title" />
									<Input
										value={todoTitle}
										onChange={(e: any) => setTodoTitle(e.target?.value as any)}
										type="text"
										className="rounded-md bg-transparent outline-none border border-blue-600"
										id="title"
									/>
								</div>
								{/* todo description  */}
								<div className="p-2 mb-4">
									<div className="mb-2 flex items-center justify-between w-full">
										<Label htmlFor="description" label="Todo Description" />
										<AiButton onClick={generateDesc} />
									</div>
									<ReactQuill
										value={todoDesc as any}
										onChange={handleDescriptionChange}
										style={{
											border: "1px solid #0096FF",
											borderRadius: "10px",
										}}
										id="description"
									/>
								</div>
								{/* urgency */}
								<div className="p-2 mb-4 flex flex-col">
									<Label htmlFor="urgency" label="Urgency" />
									<div className="flex items-center space-x-5">
										<div className="flex items-center space-x-2">
											<Input
												type="radio"
												checked={urgency ? false : true}
												name="urgency"
												id="notSoImportant"
												onChange={() => setUrgency(false)}
												className="h-[20px] w-[20px]"
											/>
											<Label
												label="Not So Important"
												htmlFor="notSoImportant"
											/>
										</div>

										<div className="flex items-center space-x-2">
											<Input
												type="radio"
												checked={urgency ? true : false}
												name="urgency"
												id="important"
												onChange={() => setUrgency(true)}
												className="h-[20px] w-[20px]"
											/>
											<Label label="Important" htmlFor="important" />
										</div>
									</div>
								</div>
								{/* deadline */}
								<div className="p-2 mb-4 flex flex-col">
									<Label htmlFor="deadline" label="To Be Completed By" />
									<DatePicker
										minDate={new Date()}
										value={date}
										onChange={setDate}
									/>
								</div>
								<div className="flex items-center justify-end">
									<GlobalButton variant="BLUE" type="submit">
										<p className="text-md font-medium font-poppins">Save</p>
										<RiTodoFill fontSize={15} />
										{isLoading && <Loader color="white" />}
									</GlobalButton>
								</div>
							</form>
						) : (
							<form onSubmit={submitQa}>
								{/* add/edit qa form  */}
								{/* question */}
								<div className="p-2 mb-4">
									<Label htmlFor="question" label="Question" />
									<Input
										value={question}
										onChange={(e: any) => setQuestion(e.target?.value)}
										type="text"
										className="rounded-md bg-transparent outline-none border border-blue-600"
										id="question"
									/>
								</div>

								{/* answer  */}
								<div className="p-2 mb-4">
									<div className="mb-2 flex items-center justify-between w-full">
										<Label htmlFor="answer" label="Answer" />
										<AiButton onClick={generateDesc} />
									</div>
									<ReactQuill
										theme="snow"
										value={answer as any}
										onChange={handleAnswerChange}
										style={{
											border: "1px solid #0096FF",
											borderRadius: "10px",
										}}
										id="answer"
									/>
								</div>
								{/* importance */}
								{setImportance && (
									<div className="flex flex-col md:flex-row items-center space-x-4 w-full mb-4">
										<div className="flex items-center space-x-2">
											<Input
												type="radio"
												checked={importance === "Not Important"}
												name="importance"
												id="notImportant"
												onChange={() => setImportance("Not Important")}
												className="h-[20px] w-[20px]"
											/>
											<Label label="Not Important" htmlFor="notImportant" />
										</div>
										<div className="flex items-center space-x-2">
											<Input
												type="radio"
												checked={importance === "Important"}
												name="importance"
												id="important"
												onChange={() => setImportance("Important")}
												className="h-[20px] w-[20px]"
											/>
											<Label label="Important" htmlFor="important" />
										</div>
										<div className="flex items-center space-x-2">
											<Input
												type="radio"
												checked={importance === "Very Important"}
												name="importance"
												id="veryImportant"
												onChange={() => setImportance("Very Important")}
												className="h-[20px] w-[20px]"
											/>
											<Label label="Very Important" htmlFor="veryImportant" />
										</div>
									</div>
								)}
								<div className="flex items-center justify-end">
									<GlobalButton variant="BLUE" type="submit">
										<p className="text-md font-medium font-poppins">Save</p>
										<RiTodoFill fontSize={15} />
										{isLoading && <Loader color="white" />}
									</GlobalButton>
								</div>
							</form>
						)}
					</div>
				</Modal>
			</div>
		</React.Fragment>
	);
};
