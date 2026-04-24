
import { SignupApiPayload } from "@/src/types";
import { postAuth } from "./authRequest";

export const signup = (data: SignupApiPayload)=> {
    return postAuth("/user", data);
};