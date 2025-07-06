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

export interface PaginationData {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalDocuments: number;
}

export interface TodoState {
	todoItems: Todo[];
	success: boolean;
	error: any;
	isLoading: boolean;
	message: string | null;
	aiDesc: string | null;
	todoCountChanged: boolean;
	pagination: PaginationData;
}

export interface QaState {
	qaItems: Qa[];
	success: boolean;
	message: string | null;
	aiAnswer: string | null;
	isLoading: boolean;
	createdUpdatedSuccessfully: boolean;
	pagination: PaginationData;
}

export interface AdminState {
	users: any[];
	todoItems: Todo[];
	qaItems: Qa[];
	success: boolean;
	error: string;
	successMessage: string;
	isLoading: boolean;
	user: any;
	toggler: boolean;
	pagination: PaginationData;
}
