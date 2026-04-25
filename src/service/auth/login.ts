import type { LoginFormValues } from "@/src/types";
import { postAuth } from "./authRequest";

export const login = (data: LoginFormValues) => {
  return postAuth("/auth/login", data);
};
