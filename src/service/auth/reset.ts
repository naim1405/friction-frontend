import type { ResetPasswordApi } from "@/src/types";
import { postAuth } from "./authRequest";

export const resetPassword = (data: ResetPasswordApi) => {
  return postAuth("/auth/reset-password", data);
};
