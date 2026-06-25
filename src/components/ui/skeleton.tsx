import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

type SkeletonProps = {
	className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
	const ThemeState = useSelector((state: RootState) => state.theme);

	return (
		<div
			className={`animate-pulse rounded-md ${
				ThemeState?.dark ? "bg-gray-700" : "bg-gray-200"
			} ${className}`}
		/>
	);
};
