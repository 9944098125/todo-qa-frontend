import React from "react";
import AccordionComponent from "./accordion";

type Props = {
	title: string | undefined;
	description: string | undefined;
	deadline: string;
	urgency: boolean;
	_id: string | undefined;
	editTodo: (_id: string) => void;
	deleteTodo: (_id: string) => void;
	setModalHead: (value: string) => void;
	isLoading: boolean;
};
const TodoItem = (props: Props) => {
	const {
		title,
		description,
		deadline,
		urgency,
		_id,
		editTodo,
		deleteTodo,
		setModalHead,
		isLoading,
	} = props;
	return (
		<React.Fragment>
			<div className="my-4">
				<AccordionComponent
					_id={_id}
					heading={title}
					content={description}
					subContentOne={deadline}
					subContentTwo={urgency}
					clickEdit={editTodo}
					clickDelete={deleteTodo}
					setModalHead={setModalHead}
					isLoading={isLoading}
				/>
			</div>
		</React.Fragment>
	);
};

export default TodoItem;
