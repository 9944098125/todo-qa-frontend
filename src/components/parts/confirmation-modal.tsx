import React from "react";
import Modal from "react-modal";
import GlobalButton from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../ui/Loader";

type Props = {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
	loading: boolean;
};
const ConfirmationModal = (props: Props) => {
	const { show, onClose, onConfirm, message, loading } = props;

	const ThemeState = useSelector((state: RootState) => state.theme);

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			transform: "translate(-50%, -50%)",
			width: "400px", // Adjust width as needed
			height: "200px", // Adjust height as needed
			padding: "20px", // Add padding
			borderRadius: "10px", // Add rounded corners
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better appearance
		},
	};

	return (
		<React.Fragment>
			<Modal isOpen={show} style={customStyles}>
				<div
					style={{ backgroundColor: ThemeState.dark ? "black" : "white" }}
					className="relative w-full">
					<div className="absolute right-2 top-2">
						<button
							onClick={onClose}
							className="bg-gray-400 text-white flex items-center justify-center h-[25px] w-[25px] rounded-full p-2">
							x
						</button>
					</div>
					<div className="w-full flex flex-col justify-between">
						<h5 className="text-md font-poppins font-medium mb-8">{message}</h5>
						<div className="flex items-center justify-between px-5">
							<GlobalButton
								variant="DESTRUCTIVE"
								type="button"
								onClick={onConfirm}>
								Yes {loading && <Loader color="white" />}
							</GlobalButton>
							<GlobalButton variant="OUTLINED" type="button" onClick={onClose}>
								No
							</GlobalButton>
						</div>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
};

export default ConfirmationModal;
