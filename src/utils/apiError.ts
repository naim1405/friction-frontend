import { IResponse } from "../types";

export const getErrorMessage = (
  result: IResponse<unknown> | null,
  fallback: string,
) => {
  if (result?.message) {
    return result.message;
  }

  if (typeof result?.data === "string") {
    return result.data;
  }

  return fallback;
};
