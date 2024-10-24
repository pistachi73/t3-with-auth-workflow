export const MAX_UPLOAD_IMAGE_SIZE_IN_MB = 5;
export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024 * MAX_UPLOAD_IMAGE_SIZE_IN_MB;

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min

export const DEFAULT_LOGIN_REDIRECT = "/";

export const VERCEL_HEADERS = {
  HOST: "x-nexturl-host",
  URL: "x-url",
  PATHNAME: "x-pathname",
  COUNTRY: "x-geo-country-code",
  DEVICE_TYPE: "x-device-type",
} as const;

export const API_AUTH_PREFIX = "/api/auth";
export const AUTH_ROUTES = ["/login", "/reset-password", "/error"];
export const PRIVATE_ROUTES = ["/settings", "/account"];
