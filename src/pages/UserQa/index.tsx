import React, { useEffect, useState } from "react";
import QaOptions from "../../components/parts/qa-options";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { AlertModal } from "../../components/ui/alert";
import {
	createQaForUser,
	deleteQaForUser,
	getQaOfAUser,
	updateQaForUser,
} from "../../redux/actions/admin";
import { useNavigate, useParams } from "react-router-dom";
import QaItem from "../../components/parts/qa-item";
import { Accordion } from "react-accessible-accordion";
import { generateAnswer } from "../../redux/actions/qa";

export const UserQa = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const AlertState = useSelector((state: RootState) => state.alert);
	const AdminQaState = useSelector((state: RootState) => state.admin);
	const QaState = useSelector((state: RootState) => state.qa);

	const admin = localStorage.getItem("asp-todo-qa-user")
		? JSON.parse(localStorage.getItem("asp-todo-qa-user") as string)
		: null;

	const [activeSelection, setActiveSelection] = useState<string | undefined>();
	const [showQaModal, setShowQaModal] = useState<{
		qaId: string;
		bool: boolean;
	}>({ qaId: "", bool: false });
	const [modalTitle, setModalTitle] = useState("");
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState<{
		rawData: string;
		formattedData: string;
	}>({ rawData: "", formattedData: "" });
	const [importance, setImportance] = useState<string>("");

	const handleAnswerChange = (value: string) => {
		setAnswer({
			rawData: value.replace(/<[^>]*>?/gm, ""), // Removes all HTML tags for plain text
			formattedData: value, // Keeps the formatted HTML
		});
	};

	const editQa = (qaId: string) => {
		setShowQaModal({
			qaId: qaId,
			bool: true,
		});
		if (qaId) {
			const updatingQa = AdminQaState?.qaItems?.find(
				(i: any) => i?._id === qaId
			);
			if (updatingQa) {
				setQuestion(updatingQa?.question);
				setAnswer({
					rawData: updatingQa?.answer,
					formattedData: updatingQa?.answer,
				});
				setImportance(updatingQa?.importance);
				setActiveSelection(updatingQa?.toolId);
			}
		}
	};

	const generateAnswerWithAi = () => {
		dispatch(generateAnswer(question as string) as any);
	};

	useEffect(() => {
		if (QaState?.aiAnswer) {
			setAnswer({
				rawData: QaState?.aiAnswer,
				formattedData: QaState?.aiAnswer,
			});
		}
	}, [QaState?.aiAnswer]);

	const deleteQa = (qaId: string) => {
		if (qaId) {
			dispatch(deleteQaForUser(userId as string, qaId, admin?._id) as any);
		}
	};

	const submitQaForm = (event: any) => {
		event.preventDefault();
		const body = {
			question: question,
			answer: answer?.formattedData,
			toolId: activeSelection,
			importance: importance || "Important",
		};
		if (modalTitle === "Add Qa") {
			dispatch(
				createQaForUser(body as any, userId as string, admin?._id) as any
			);
		} else {
			dispatch(
				updateQaForUser(
					body as any,
					userId as string,
					showQaModal?.qaId,
					admin?._id
				) as any
			);
		}
	};

	useEffect(() => {
		if (AdminQaState?.success) {
			setShowQaModal({ qaId: "", bool: false });
			setQuestion("");
			setAnswer({
				rawData: "",
				formattedData: "",
			});
		}
	}, [AdminQaState?.success, AdminQaState?.toggler]);

	useEffect(() => {
		if (activeSelection) {
			dispatch(
				getQaOfAUser(userId as string, activeSelection as string) as any
			);
		}
	}, [dispatch, userId, activeSelection, AdminQaState?.toggler]);

	useEffect(() => {
		if (!localStorage.getItem("asp-todo-qa-user")) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<React.Fragment>
			<div className="w-full p-2 md:p-4">
				{AlertState?.message && <AlertModal show={true} />}
				<QaOptions
					activeSelection={activeSelection}
					setActiveSelection={setActiveSelection}
					showQaModal={showQaModal}
					setShowQaModal={setShowQaModal}
					modalTitle={modalTitle}
					setModalTitle={setModalTitle}
					submitQaForm={submitQaForm}
					handleAnswerChange={handleAnswerChange}
					isLoading={AdminQaState?.isLoading}
					question={question}
					setQuestion={setQuestion}
					answer={answer?.formattedData}
					setAnswer={setAnswer}
					importance={importance}
					setImportance={setImportance}
					generateAIAnswer={generateAnswerWithAi}
				/>
				<div className="flex flex-col space-y-2 md:space-y-4">
					<Accordion className="rounded-lg" autoCapitalize="words">
						{AdminQaState?.qaItems?.map((item) => {
							return (
								<QaItem
									question={item?.question}
									answer={item?.answer}
									importance={item?.importance}
									_id={item?._id}
									editQa={editQa}
									deleteQa={deleteQa}
									setModalHead={setModalTitle}
									isLoading={AdminQaState?.isLoading}
								/>
							);
						})}
					</Accordion>
				</div>
			</div>
		</React.Fragment>
	);
};
