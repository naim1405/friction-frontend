export type LoginFormValues = {
	email: string;
	password: string;
};

export type SignupFormValues = {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
};

export type SignupApiPayload = {
	password: string;
	admin?: {
		name: string;
		email: string;
		phone: string;
	};
	customer?: {
		name: string;
		email: string;
		phone: string;
	};
};

export type ForgotPasswordFormValues = {
	email: string;
};

export type ResetPasswordFormValues = {
	newPassword: string;
	confirmPassword: string;
};
export type ResetPasswordApi = {
	newPassword: string;
	token: string;
};
