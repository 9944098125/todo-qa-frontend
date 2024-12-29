import React from "react";

export default function TabTitle({ title }: { title: string }) {
	React.useEffect(() => {
		document.title = `TODO QA - ${title}`;
	}, [document]);
	return null;
}
