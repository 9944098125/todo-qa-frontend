import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalDocuments: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	totalDocuments,
	pageSize,
	onPageChange,
	className = "",
}) => {
	// Calculate the range of items being displayed
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalDocuments);

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		
		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is less than max visible
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show pages around current page
			let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
			let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
			
			// Adjust if we're near the end
			if (endPage - startPage + 1 < maxVisiblePages) {
				startPage = Math.max(1, endPage - maxVisiblePages + 1);
			}
			
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}
		}
		
		return pages;
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null; // Don't show pagination if there's only one page
	}

	return (
		<div className={`flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 ${className}`}>
			{/* Items info */}
			<div className="flex items-center text-sm text-gray-700">
				<span>
					Showing <span className="font-medium">{startItem}</span> to{" "}
					<span className="font-medium">{endItem}</span> of{" "}
					<span className="font-medium">{totalDocuments}</span> results
				</span>
			</div>

			{/* Pagination controls */}
			<div className="flex items-center space-x-2">
				{/* Previous button */}
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
						currentPage === 1
							? "text-gray-400 bg-gray-100 cursor-not-allowed"
							: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
					}`}
				>
					<FaChevronLeft className="w-4 h-4" />
					<span className="sr-only">Previous</span>
				</button>

				{/* Page numbers */}
				<div className="flex items-center space-x-1">
					{pageNumbers.map((page) => (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
								page === currentPage
									? "z-10 bg-blue-600 text-white"
									: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
							}`}
						>
							{page}
						</button>
					))}
				</div>

				{/* Next button */}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
						currentPage === totalPages
							? "text-gray-400 bg-gray-100 cursor-not-allowed"
							: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
					}`}
				>
					<FaChevronRight className="w-4 h-4" />
					<span className="sr-only">Next</span>
				</button>
			</div>
		</div>
	);
}; 