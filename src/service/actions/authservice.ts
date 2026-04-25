import {
  getTokenFromLocal,
  removeTokenFromLocal,
  setTokenInLocal,
} from "@/src/utils/localStorage";

// Function to save access token
export const saveAccessToken = (token: string, key: string) => {
  return setTokenInLocal(key, token);
};

export const getAccessToken = (key: string) => {
  return getTokenFromLocal(key);
};

export const removeAccessToken = (key: string) => {
  return removeTokenFromLocal(key);
};
