import axios, { AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { getCurrentLang } from "@/i18n";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 15000,
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
    },
    unknown,
    { status: number; data?: any }
  > =>
  async ({ url, method = "get", data, params }) => {
    console.log(getCurrentLang());
    
    try {
      const result = await axiosInstance.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Accept-Language": getCurrentLang(),
        },
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data ?? { message: err.message },
        },
      };
    }
  };
