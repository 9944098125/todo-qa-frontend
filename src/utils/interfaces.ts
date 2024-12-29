export interface InputProps {
	inputType: string;
	inputPlaceholder: string;
	inputClassName?: string;
	inputLabel?: string;
}
export interface LoginPayload {
	emailOrPhone: string;
	password: string;
}

export interface RegisterProps {
	name: string | undefined;
	email: string | undefined;
	password: string | undefined;
	phone: string | undefined;
	confirmPassword?: string | undefined;
	profilePicture: string | undefined;
	bio: string | undefined;
	isAdmin: boolean;
}

export interface Todo {
	_id?: string | undefined;
	title: string | undefined;
	description: string | undefined;
	urgency: boolean;
	deadline: string | undefined;
	userId: string | undefined;
}

export interface Qa {
	_id: string;
	question: string;
	answer: string;
	importance: string;
	toolId: string;
	userId: string;
}
