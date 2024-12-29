import React from "react";
import AccordionComponent from "./accordion";

type Props = {
	question: string;
	answer: string;
	importance: string;
	_id: string;
	editQa: (qaId: string) => void;
	deleteQa: (qaId: string) => void;
	setModalHead: any;
	isLoading: boolean;
};
const QaItem = (props: Props) => {
	const {
		question,
		answer,
		importance,
		_id,
		editQa,
		deleteQa,
		setModalHead,
		isLoading,
	} = props;
	return (
		<React.Fragment>
			<div className="my-4">
				<AccordionComponent
					_id={_id}
					heading={question}
					content={answer}
					importance={importance}
					clickEdit={editQa}
					clickDelete={deleteQa}
					setModalHead={setModalHead}
					isLoading={isLoading}
					qa
				/>
			</div>
		</React.Fragment>
	);
};

export default QaItem;
