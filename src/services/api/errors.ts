import axios from "axios";

type ApiErrorBody = {
  message?: string;
  error?: string;
  code?: string;
  details?: string | string[] | Record<string, unknown>;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
) => {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const body = error.response?.data;
  if (body?.message) return body.message;
  if (body?.error) return body.error;
  if (Array.isArray(body?.details)) return body.details.join(", ");
  if (typeof body?.details === "string") return body.details;
  return error.message || fallback;
};
