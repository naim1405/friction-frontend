/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

// Enhanced type definitions
interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
  meta?: any;
  contentType?: string;
  timeout?: number;
  validateStatus?: (status: number) => boolean;
}

interface AxiosBaseQueryError {
  status?: number;
  data?: any;
  message?: string;
}

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({
    url,
    method = "GET",
    data,
    params,
    headers,
    contentType,
    timeout,
    validateStatus,
    meta,
  }) => {
    try {
      const isFormData = data instanceof FormData;

      // Build request config
      const config: AxiosRequestConfig = {
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,

          ...(isFormData
            ? {}
            : { "Content-Type": contentType || "application/json" }),
        },

        ...(timeout && { timeout }),
        ...(validateStatus && { validateStatus }),

        ...(isFormData && {
          transformRequest: [(data) => data],
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }),
        withCredentials: true,
      };

      const result = await axiosInstance(config);

      return {
        data: result.data,
        meta: {
          request: meta,
          response: {
            status: result.status,
            statusText: result.statusText,
            headers: result.headers,
          },
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      const errorResponse: AxiosBaseQueryError = {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      };

      if (err.code === "ECONNABORTED") {
        errorResponse.message = "Request timeout";
      } else if (err.code === "ERR_NETWORK") {
        errorResponse.message = "Network error";
      } else if (!err.response) {
        errorResponse.message = "Request failed - no response received";
      }

      return { error: errorResponse };
    }
  };
