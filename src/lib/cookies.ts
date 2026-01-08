import { getCookie, setCookie, removeCookie } from "typescript-cookie";

export const getAccessToken = (): string | undefined =>
  getCookie("accessToken");
export const getRefreshToken = (): string | undefined =>
  getCookie("refreshToken");

export const setTokens = (access: string, refresh: string): void => {
  setCookie("accessToken", access, { secure: false });
  setCookie("refreshToken", refresh, { secure: false });
};

export const clearTokens = (): void => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
};
