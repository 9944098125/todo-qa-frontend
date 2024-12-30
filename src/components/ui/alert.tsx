import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

type Props = {
	show: boolean;
};

export const AlertModal = (props: Props) => {
	const { show } = props;

	const AlertState = useSelector((state: RootState) => state.alert);
	const ThemeState = useSelector((state: RootState) => state.theme);

	const customStyles = {
		backgroundColor: ThemeState.dark ? "black" : "",
		color: ThemeState.dark ? "white" : "",
		border: "1px #0096FF solid",
		borderRadius: "9px",
	};

	return (
		<React.Fragment>
			{AlertState.type === "success" ? (
				<Modal
					open={show}
					onClose={() => console.log("ALERT CLOSED")}
					showCloseIcon={false}
					styles={{
						modal: customStyles,
					}}
					center>
					<div
						className={`w-full rounded-md flex items-center space-x-5 p-5 ${
							ThemeState.dark ? "bg-black text-white" : ""
						}`}>
						<img src="/images/tick.webp" alt="" height={30} width={30} />
						<p className="text-sm font-medium font-poppins">
							{AlertState?.message}
						</p>
					</div>
				</Modal>
			) : (
				<Modal
					open={show}
					onClose={() => console.log("ALERT CLOSED")}
					showCloseIcon={false}
					styles={{
						modal: customStyles,
					}}
					center>
					<div
						className={`w-full rounded-md flex items-center space-x-5 p-5 ${
							ThemeState.dark ? "bg-black text-white" : ""
						}`}>
						<img src="/images/cross.webp" alt="" height={30} width={30} />
						<p className="text-sm font-medium font-poppins">
							{AlertState?.message}
						</p>
					</div>
				</Modal>
			)}
		</React.Fragment>
	);
};
