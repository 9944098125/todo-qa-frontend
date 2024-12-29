import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "./Loader";

type Props = {
	onClick?: any;
};
const AiButton = (props: Props) => {
	const TodoState = useSelector((state: RootState) => state.todo);
	const QaState = useSelector((state: RootState) => state.qa);

	return (
		<React.Fragment>
			<button
				type="button"
				className="h-[40px] w-[200px] bg-gray-400 shadow-lg rounded-lg p-5 text-[12px] flex items-center justify-center space-x-2"
				{...props}>
				<span className="text-[10px] font-normal font-poppins text-white">
					Generate with
				</span>
				{/* icon */}
				<img src="/images/ai.webp" alt="" height={15} width={20} />
				{(TodoState?.isLoading || QaState?.isLoading) && (
					<Loader color="white" />
				)}
			</button>
		</React.Fragment>
	);
};

export default AiButton;
