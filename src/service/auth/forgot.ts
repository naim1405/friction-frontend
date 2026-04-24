import { ForgotPasswordFormValues } from "@/src/types";
import { postAuth } from "./authRequest";

export const forgotPassword = (data: ForgotPasswordFormValues) => {
    return postAuth("/auth/forgot-password", data);
};