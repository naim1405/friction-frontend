import { postAuth } from "./authRequest";

export const handleLogout = () => {
  return postAuth("/auth/logout");
};
