import React from "react";
import { Modal } from "react-responsive-modal";
import GlobalButton from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../ui/Loader";
import "react-responsive-modal/styles.css";

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
			<Modal
				open={show}
				onClose={onClose}
				closeOnOverlayClick={false}
				center
				closeIcon={closeIcon}
				styles={{
					modal: {
						backgroundColor: ThemeState.dark ? "black" : "white",
						color: ThemeState.dark ? "white" : "black",
						border: "1px #0096FF solid",
						borderRadius: "9px",
						width: "100%",
					},
				}}>
				<div className="relative w-full">
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
