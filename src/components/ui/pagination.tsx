import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalDocuments: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	className?: string;
}

const DOTS = "...";

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	totalDocuments,
	pageSize,
	onPageChange,
	className = "",
}) => {
	const dark = useSelector((state: RootState) => state.theme?.dark);

	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalDocuments);

	// Build page list with leading/trailing ellipsis for large ranges.
	const getPageNumbers = (): (number | string)[] => {
		const siblingCount = 1;
		const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots

		if (totalPages <= totalNumbers) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const leftSibling = Math.max(currentPage - siblingCount, 1);
		const rightSibling = Math.min(currentPage + siblingCount, totalPages);

		const showLeftDots = leftSibling > 2;
		const showRightDots = rightSibling < totalPages - 1;

		const pages: (number | string)[] = [];

		if (!showLeftDots && showRightDots) {
			const leftRange = Array.from(
				{ length: 3 + siblingCount * 2 },
				(_, i) => i + 1
			);
			return [...leftRange, DOTS, totalPages];
		}

		if (showLeftDots && !showRightDots) {
			const rightRange = Array.from(
				{ length: 3 + siblingCount * 2 },
				(_, i) => totalPages - (3 + siblingCount * 2) + 1 + i
			);
			return [1, DOTS, ...rightRange];
		}

		for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
		return [1, DOTS, ...pages, DOTS, totalPages];
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null;
	}

	const arrowBase =
		"group inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60";

	return (
		<div
			className={`mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border px-5 py-4 shadow-sm backdrop-blur sm:flex-row ${
				dark
					? "border-white/10 bg-white/5 text-gray-200"
					: "border-gray-100 bg-white/80 text-gray-700"
			} ${className}`}
		>
			{/* Items info */}
			<div className="flex items-center text-sm">
				<span
					className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
						dark
							? "bg-white/10 text-gray-200"
							: "bg-blue-50 text-blue-700"
					}`}
				>
					Showing <span className="font-bold">{startItem}</span>–
					<span className="font-bold">{endItem}</span> of{" "}
					<span className="font-bold">{totalDocuments}</span>
				</span>
			</div>

			{/* Pagination controls */}
			<div className="flex items-center gap-1.5">
				{/* Previous button */}
				<button
					aria-label="Previous page"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`${arrowBase} ${
						currentPage === 1
							? dark
								? "cursor-not-allowed text-gray-600"
								: "cursor-not-allowed text-gray-300"
							: dark
							? "text-gray-300 hover:-translate-x-0.5 hover:bg-white/10"
							: "text-gray-600 hover:-translate-x-0.5 hover:bg-blue-50 hover:text-blue-600"
					}`}
				>
					<FaChevronLeft className="h-3.5 w-3.5" />
				</button>

				{/* Page numbers */}
				<div className="flex items-center gap-1">
					{pageNumbers.map((page, idx) => {
						if (page === DOTS) {
							return (
								<span
									key={`dots-${idx}`}
									className={`inline-flex h-10 w-8 items-end justify-center pb-2 text-sm ${
										dark ? "text-gray-500" : "text-gray-400"
									}`}
								>
									{DOTS}
								</span>
							);
						}

						const isActive = page === currentPage;
						return (
							<button
								key={page}
								onClick={() => onPageChange(page as number)}
								aria-current={isActive ? "page" : undefined}
								className={`relative inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${
									isActive
										? "scale-105 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
										: dark
										? "text-gray-300 hover:bg-white/10"
										: "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
								}`}
							>
								{page}
							</button>
						);
					})}
				</div>

				{/* Next button */}
				<button
					aria-label="Next page"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`${arrowBase} ${
						currentPage === totalPages
							? dark
								? "cursor-not-allowed text-gray-600"
								: "cursor-not-allowed text-gray-300"
							: dark
							? "text-gray-300 hover:translate-x-0.5 hover:bg-white/10"
							: "text-gray-600 hover:translate-x-0.5 hover:bg-blue-50 hover:text-blue-600"
					}`}
				>
					<FaChevronRight className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
};
