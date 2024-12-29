import React from "react";
import Label from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type Props = {
	label: string;
	fieldName: string;
	form: any;
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
	placeholder?: string;
};
const PasswordInput = (props: Props) => {
	const { label, fieldName, form, showPassword, setShowPassword, placeholder } =
		props;
	return (
		<React.Fragment>
			<div className="w-full">
				<Label htmlFor={fieldName} label={label} />
				<div className="flex items-center w-full">
					<Input
						type={showPassword ? "text" : "password"}
						className="rounded-default bg-transparent rounded-lg border-2 active:border-cyan-600 focus:border-cyan-600 outline-none w-full"
						{...form.register(fieldName, {
							required: `${fieldName} is required !`,
							validate: (value: string) =>
								value?.length >= 7 || "Password must be of min length 8",
						})}
						id={fieldName}
						placeholder={placeholder}
					/>
					{showPassword ? (
						<FaEyeSlash
							fontSize={20}
							onClick={() => setShowPassword(!showPassword)}
							style={{ marginLeft: "-25px" }}
						/>
					) : (
						<FaEye
							fontSize={20}
							onClick={() => setShowPassword(!showPassword)}
							style={{ marginLeft: "-25px" }}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default PasswordInput;
