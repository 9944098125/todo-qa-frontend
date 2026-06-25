import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Skeleton } from "../ui/skeleton";

type Props = {
	variant: "qa" | "todo";
};

const AccordionItemSkeleton = ({ variant }: Props) => {
	const ThemeState = useSelector((state: RootState) => state.theme);

	return (
		<div
			className={`my-4 overflow-hidden rounded-lg border ${
				ThemeState?.dark
					? "border-white bg-gray-900"
					: "border-blue-600 bg-blue-50"
			}`}>
			<div className="flex h-14 items-center gap-3 px-4">
				<Skeleton className="h-4 w-3/4 max-w-md" />
				<Skeleton className="ml-auto h-6 w-6 shrink-0 rounded-full" />
			</div>
			<div className="min-h-[150px] space-y-4 p-4">
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-11/12" />
				<Skeleton className="h-3 w-4/5" />
				<div className="flex items-center justify-between pt-6">
					{variant === "todo" ? (
						<>
							<div className="flex items-center gap-3">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex items-center gap-3">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-5 w-5 rounded-full" />
							</div>
						</>
					) : (
						<>
							<div className="flex items-center gap-3">
								<Skeleton className="h-9 w-9 rounded-full" />
								<Skeleton className="h-9 w-9 rounded-full" />
							</div>
							<Skeleton className="h-[60px] w-[60px] rounded-full" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AccordionItemSkeleton;
