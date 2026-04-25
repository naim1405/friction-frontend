import { getAccessToken } from "@/src/utils/authTokens";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const postAuth = async <TPayload>(
  endpoint: string,
  payload?: TPayload,
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!baseUrl) {
    return {
      ok: false,
      status: 0,
      result: {
        success: false,
        message: "Missing NEXT_PUBLIC_BACKEND_URL in the frontend environment.",
      },
    };
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers:
      payload !== undefined
        ? {
            "Content-Type": "application/json",
            ...(getAccessToken()
              ? { Authorization: `Bearer ${getAccessToken()}` }
              : {}),
          }
        : getAccessToken()
          ? { Authorization: `Bearer ${getAccessToken()}` }
          : undefined,
    body: payload !== undefined ? JSON.stringify(payload) : undefined,
  });

  const result = await parseResponse(response);

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
};
