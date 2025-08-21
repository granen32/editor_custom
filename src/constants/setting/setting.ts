export const DEBOUNCE = {
  DELAY: 500,
} as const;

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 15,
    MIN_TYPES: 3,
  },
} as const;

export const ROUTES = {
  MAIN: "/member",
  LOGIN: "/auth",
  JOIN: "/account/join",
  FIND_ID: "/findid",
  FIND_PASSWORD: "/findpassword",
  ACCOUNT_ACTIVATION: "/account/activation",
  PRIVACY_POLICY: "/privacy/policy",
} as const;

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const HTTP_METHODS = Object.values(HttpMethod);
