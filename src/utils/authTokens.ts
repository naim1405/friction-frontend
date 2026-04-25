const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const canUseBrowserStorage = () => typeof window !== "undefined";

export const authTokenKeys = {
  access: ACCESS_TOKEN_KEY,
  refresh: REFRESH_TOKEN_KEY,
};

export function getAccessToken() {
  if (!canUseBrowserStorage()) {
    return "";
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
}

export function persistAuthTokens(tokens: { accessToken?: string; refreshToken?: string }) {
  if (!canUseBrowserStorage()) {
    return;
  }

  if (tokens.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    document.cookie = `${ACCESS_TOKEN_KEY}=${tokens.accessToken}; path=/; max-age=604800; SameSite=Lax`;
  }

  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    document.cookie = `${REFRESH_TOKEN_KEY}=${tokens.refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
  }
}

export function clearAuthTokens() {
  if (!canUseBrowserStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}
