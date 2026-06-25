import React, { useEffect, useState } from "react";
import QaOptions from "../../components/parts/qa-options";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { AlertModal } from "../../components/ui/alert";
import QaItem from "../../components/parts/qa-item";
import { Accordion } from "react-accessible-accordion";
import { Pagination } from "../../components/ui/pagination";
import {
	createQa,
	deleteQa,
	generateAnswer,
	getQa,
	updateQa,
} from "../../redux/actions/qa";
import ItemListSkeleton from "../../components/parts/item-list-skeleton";

export const Qa = () => {
	const dispatch = useDispatch();

	const AlertState = useSelector((state: RootState) => state.alert);
	const QaState = useSelector((state: RootState) => state.qa);
	const SearchState = useSelector((state: RootState) => state.search);

	const user = localStorage.getItem("asp-todo-qa-user")
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
	const [currentPage, setCurrentPage] = useState<number>(1);

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
			const updatingQa = QaState?.qaItems?.find((i: any) => i?._id === qaId);
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

	const deleteOwnQa = (qaId: string) => {
		if (qaId) {
			dispatch(deleteQa(qaId, user?._id) as any);
		}
	};

	const submitQaForm = (event: any) => {
		event.preventDefault();
		const body = {
			question: question,
			answer: answer?.formattedData,
			toolId: activeSelection,
			importance: importance || "Important",
			userId: user?._id,
		};
		if (modalTitle === "Add Qa") {
			dispatch(createQa(body as any) as any);
		} else {
			delete body.userId;
			dispatch(updateQa(showQaModal?.qaId, user?._id, body as any) as any);
		}
	};

	useEffect(() => {
		if (QaState?.success) {
			setShowQaModal({ qaId: "", bool: false });
			setQuestion("");
			setAnswer({
				rawData: "",
				formattedData: "",
			});
		}
	}, [QaState?.success]);

	useEffect(() => {
		if (modalTitle === "Add Qa") {
			setQuestion("");
			setAnswer({
				rawData: "",
				formattedData: "",
			});
			setImportance("");
		}
	}, [showQaModal, modalTitle]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [activeSelection]);

	useEffect(() => {
		if (activeSelection) {
			dispatch(getQa(user?._id, activeSelection as string, currentPage, 10) as any);
		}
	}, [
		dispatch,
		user?._id,
		activeSelection,
		QaState?.createdUpdatedSuccessfully,
		AlertState?.message,
		currentPage,
	]);

	return (
		<React.Fragment>
			<div className="w-full p-2">
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
					isLoading={QaState?.isLoading}
					question={question}
					setQuestion={setQuestion}
					answer={answer?.formattedData}
					setAnswer={setAnswer}
					importance={importance}
					setImportance={setImportance}
					generateAIAnswer={generateAnswerWithAi}
				/>
				<Accordion>
					{QaState?.isFetchingList && !SearchState?.query ? (
						<ItemListSkeleton variant="qa" />
					) : SearchState?.query ? (
						SearchState.filteredItems?.map((item) => {
							return (
								<QaItem
									key={item?._id}
									question={item?.question}
									answer={item?.answer}
									importance={item?.importance}
									_id={item?._id}
									editQa={editQa}
									deleteQa={deleteOwnQa}
									setModalHead={setModalTitle}
									isLoading={QaState?.isLoading}
								/>
							);
						})
					) : (
						QaState?.qaItems?.map((item) => {
							return (
								<QaItem
									key={item?._id}
									question={item?.question}
									answer={item?.answer}
									importance={item?.importance}
									_id={item?._id}
									editQa={editQa}
									deleteQa={deleteOwnQa}
									setModalHead={setModalTitle}
									isLoading={QaState?.isLoading}
								/>
							);
						})
					)}
				</Accordion>
				{/* Pagination Component */}
				{!SearchState?.query && QaState?.pagination?.totalPages > 1 && (
					<Pagination
						currentPage={QaState.pagination.pageNumber}
						totalPages={QaState.pagination.totalPages}
						totalDocuments={QaState.pagination.totalDocuments}
						pageSize={QaState.pagination.pageSize}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</React.Fragment>
	);
};
