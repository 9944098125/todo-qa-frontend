import React, { useState } from "react";
import GlobalButton from "../ui/button";
import { RiAddBoxFill } from "react-icons/ri";
import { AddEditModal } from "./add-edit-modal";

type Props = {
	activeSelection: string | undefined;
	setActiveSelection: (id: string) => void;
	showQaModal: {
		qaId: string;
		bool: boolean;
	};
	setShowQaModal: (data: { qaId: string; bool: boolean }) => void;
	modalTitle: string;
	setModalTitle: (title: string) => void;
	question: string;
	setQuestion: (question: string) => void;
	answer: string;
	setAnswer: any;
	submitQaForm: any;
	handleAnswerChange: (
		inputData: string,
		delta: any,
		source: any,
		editor: any
	) => void;
	isLoading: boolean;
	importance: string;
	setImportance: (value: string | any) => void;
	generateAIAnswer: () => void;
};
const QaOptions = (props: Props) => {
	const {
		activeSelection,
		setActiveSelection,
		showQaModal,
		setShowQaModal,
		modalTitle,
		setModalTitle,
		submitQaForm,
		handleAnswerChange,
		isLoading,
		question,
		setQuestion,
		answer,
		setAnswer,
		setImportance,
		importance,
		generateAIAnswer,
	} = props;
	const items = [
		{
			id: "1",
			name: "ReactJs",
			additionalStyles:
				activeSelection === "1"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-cyan-600",
		},
		{
			id: "2",
			name: "NodeJs",
			additionalStyles:
				activeSelection === "2"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-green-600",
		},
		{
			id: "3",
			name: "MongoDb",
			additionalStyles:
				activeSelection === "3"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-gray-600",
		},
		{
			id: "4",
			name: "ExpressJs",
			additionalStyles:
				activeSelection === "4"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-blue-600",
		},
		{
			id: "5",
			name: "React Native",
			additionalStyles:
				activeSelection === "5"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-black",
		},
		{
			id: "6",
			name: "JavaScript",
			additionalStyles:
				activeSelection === "6"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-yellow-800",
		},
		{
			id: "7",
			name: "Java",
			additionalStyles:
				activeSelection === "7"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-teal-600",
		},
		{
			id: "8",
			name: "AI & ML",
			additionalStyles:
				activeSelection === "8"
					? "bg-transparent border border-blue-600 shadow-lg"
					: "bg-red-600",
		},
	];
	return (
		<React.Fragment>
			<div className="w-full p-2">
				<div className="w-full mb-5">
					<GlobalButton
						onClick={() => {
							setShowQaModal({
								qaId: "",
								bool: true,
							});
							setModalTitle("Add Qa");
						}}
						variant="OUTLINED">
						<RiAddBoxFill fontSize={25} className="font-bold" />
						<p className="text-lg font-medium font-poppins">
							Add {items?.filter((i) => i.id === activeSelection)?.[0]?.name}{" "}
							Questions & Answers
						</p>
					</GlobalButton>
					{showQaModal?.bool && (
						<AddEditModal
							show={showQaModal?.bool}
							setShow={setShowQaModal}
							title={modalTitle}
							submitQa={submitQaForm}
							question={question}
							setQuestion={setQuestion}
							answer={answer}
							setAnswer={setAnswer}
							handleAnswerChange={handleAnswerChange}
							isLoading={isLoading}
							importance={importance}
							setImportance={setImportance}
							generateDesc={generateAIAnswer}
							qa
						/>
					)}
				</div>
				<div className="grid grid-cols-12 gap-2">
					{items?.map((item) => {
						return (
							<div
								key={item.id}
								onClick={() => setActiveSelection(item?.id)}
								className={`cursor-pointer col-span-6 md:col-span-4 lg:col-span-2 h-[50px] md:h-[70px] rounded-md md:rounded-full ${
									activeSelection === item?.id ? "" : "text-white"
								} flex items-center justify-center font-medium font-poppins ${
									item.additionalStyles
								}`}>
								<h5>{item?.name}</h5>
							</div>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
};

export default QaOptions;
