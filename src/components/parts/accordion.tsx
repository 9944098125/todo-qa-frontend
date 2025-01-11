import React, { useState } from "react";
import {
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import Loader from "../ui/Loader";

type Props = {
	_id: string | undefined;
	heading: string | undefined;
	content: string | undefined;
	subContentOne?: string | undefined;
	subContentTwo?: boolean;
	clickEdit: (_id: string) => void;
	clickDelete: (_id: string) => void;
	setModalHead: (val: string) => void;
	isLoading: boolean;
	importance?: string;
	qa?: boolean;
};
const AccordionComponent = (props: Props) => {
	const {
		heading,
		content,
		subContentOne,
		subContentTwo,
		_id,
		clickEdit,
		clickDelete,
		setModalHead,
		isLoading,
		importance,
		qa,
	} = props;
	console.log("content", content);
	const ThemeState = useSelector((state: RootState) => state.theme);

	const [active, setActive] = useState(false);

	return (
		<React.Fragment>
			<AccordionItem
				activeClassName={`border ${
					ThemeState?.dark
						? "bg-gray-900 border-white"
						: "bg-blue-50 border-blue-600"
				}`}>
				<AccordionItemHeading>
					<AccordionItemButton>{heading}</AccordionItemButton>
				</AccordionItemHeading>
				{subContentOne || subContentTwo ? (
					<AccordionItemPanel>
						<div className="relative min-h-[150px]">
							<div className="mb-5 flex flex-col md:flex-row space-y-5 md:justify-between">
								<div
									dangerouslySetInnerHTML={{ __html: content as string }}></div>
								<div className="flex items-center space-x-5 px-4 md:mb-10">
									<div
										onClick={() => {
											setModalHead("Edit Todo");
											clickEdit(_id!);
										}}
										className="bg-blue-600 text-white rounded-full p-2 cursor-pointer">
										<RiEdit2Fill fontSize={20} />
									</div>

									<div
										onClick={() => clickDelete(_id!)}
										className="bg-red-600 text-white rounded-full p-2 cursor-pointer">
										{isLoading ? (
											<Loader color="white" />
										) : (
											<RiDeleteBin2Fill fontSize={20} />
										)}
									</div>
								</div>
							</div>
							<p className="absolute right-0 bottom-0 text-sm font-poppins font-normal">
								<div className="flex items-center space-x-4">
									<div className="hidden md:flex items-center space-x-4 text-sm font-medium font-poppins">
										Deadline <FaArrowRight />{" "}
									</div>{" "}
									<span className="font-normal text-xs">{subContentOne}</span>
								</div>
							</p>
							<p className="absolute left-0 bottom-0 text-sm font-poppins font-normal">
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-4 text-sm font-medium font-poppins">
										Urgency <FaArrowRight />{" "}
									</div>{" "}
									{subContentTwo ? (
										<div className="flex items-center space-x-2">
											<div className="h-5 w-5 rounded-full bg-red-600 shadow-lg"></div>
											<p className="hidden md:block text-sm font-normal font-poppins">
												Complete it As Soon As Possible.
											</p>
										</div>
									) : (
										<div className="flex items-center space-x-2">
											<div className="h-5 w-5 rounded-full bg-orange-400 shadow-lg"></div>
											<p className="hidden md:block text-sm font-normal font-poppins">
												Can Complete it Slowly
											</p>
										</div>
									)}
								</div>
							</p>
						</div>
					</AccordionItemPanel>
				) : (
					qa && (
						<AccordionItemPanel>
							<div className="p-2 min-h-[150px] relative">
								<div className="mb-5 flex flex-col md:flex-row space-y-5 md:justify-between">
									<div
										dangerouslySetInnerHTML={{
											__html: content as string,
										}}></div>
									<div className="flex items-center space-x-5 px-4 md:mb-5">
										<div
											onClick={() => {
												setModalHead("Edit Qa");
												clickEdit(_id!);
											}}
											className="bg-blue-600 text-white rounded-full p-2 cursor-pointer">
											<RiEdit2Fill fontSize={20} />
										</div>

										<div
											onClick={() => clickDelete(_id!)}
											className="bg-red-600 text-white rounded-full p-2 cursor-pointer">
											{isLoading ? (
												<Loader color="white" />
											) : (
												<RiDeleteBin2Fill fontSize={20} />
											)}
										</div>
									</div>
								</div>
								<div
									className={`h-[60px] w-[60px] absolute right-0 bottom-0 rounded-full flex items-center justify-center hover:bg-transparent ${
										importance === "Very Important"
											? "bg-green-700"
											: importance === "Important"
											? "bg-yellow-500"
											: "bg-gray-400"
									}`}>
									<p className="text-white text-center text-[8px] font-poppins font-medium">
										{importance}
									</p>
								</div>
							</div>
						</AccordionItemPanel>
					)
				)}
			</AccordionItem>
		</React.Fragment>
	);
};

export default AccordionComponent;
