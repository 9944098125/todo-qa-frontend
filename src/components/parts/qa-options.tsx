import React from "react";
import GlobalButton from "../ui/button";
import { RiAddBoxFill } from "react-icons/ri";
import { AddEditModal } from "./add-edit-modal";
import {
	getQaToolName,
	getQaToolStyles,
	QA_TOOLS,
} from "../../constants/qa-tools";

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
	const items = QA_TOOLS.map((tool) => ({
		...tool,
		additionalStyles: getQaToolStyles(
			activeSelection,
			tool.id,
			tool.inactiveColor
		),
	}));
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
							Add {getQaToolName(activeSelection)} Questions & Answers
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
