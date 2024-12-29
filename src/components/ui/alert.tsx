import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Modal from "react-modal";

type Props = {
	show: boolean;
};

const customStyles = {
	content: {
		top: "50px",
		right: "50px",
		left: "auto",
		bottom: "auto",
	},
};

export const AlertModal = (props: Props) => {
	const { show } = props;

	const AlertState = useSelector((state: RootState) => state.alert);

	return (
		<React.Fragment>
			{AlertState.type === "success" ? (
				<Modal isOpen={show} style={customStyles}>
					<div className="w-full rounded-md flex items-center space-x-5 p-5">
						<img src="/images/tick.webp" alt="" height={30} width={30} />
						<p className="text-sm font-medium font-poppins">
							{AlertState?.message}
						</p>
					</div>
				</Modal>
			) : (
				<Modal isOpen={show} style={customStyles}>
					<div className="w-full rounded-md flex items-center space-x-5 p-5">
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
