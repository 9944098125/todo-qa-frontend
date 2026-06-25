import React from "react";
import AccordionItemSkeleton from "./accordion-item-skeleton";

type Props = {
	variant: "qa" | "todo";
	count?: number;
};

const ItemListSkeleton = ({ variant, count = 5 }: Props) => {
	return (
		<React.Fragment>
			{Array.from({ length: count }, (_, index) => (
				<AccordionItemSkeleton key={index} variant={variant} />
			))}
		</React.Fragment>
	);
};

export default ItemListSkeleton;
