// services/http.ts
import { useErrorStore } from "@/stores/useErrorStore";
import { ApiResponse } from "@/types";
import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：添加 token 等
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 0) {
      // 后端 res 中的 data
      return res.data;
    } else {
      useErrorStore.getState().addError({
        error: res.message || "network error, please try again later",
        requestId: res.requestId || "",
      });
      return Promise.reject(
        new Error(res.message || "network error, please try again later")
      );
    }
  },
  (error: AxiosError) => {
    // 新增 401 状态码处理
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    if (error?.response?.status === 403) {
      return Promise.reject(new Error("access forbidden"));
    }

    // 排除登录接口的错误记录
    if (error.config?.url !== "/api/v1/user/login") {
      const apiRes = error.response?.data as ApiResponse;
      useErrorStore.getState().addError({
        error: apiRes?.error || error.message || "network error",
        requestId: apiRes?.requestId || "",
      });
    }
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = <T>(url: string, params?: unknown): Promise<T> => {
  return apiClient.get(url, { params });
};

// 封装 POST 请求
export const post = <T>(url: string, data: unknown): Promise<T> => {
  return apiClient.post(url, data);
};

// 封装 PUT 请求
export const put = <T>(url: string, data: unknown): Promise<T> => {
  return apiClient.put(url, data);
};

// 封装 DELETE 请求
export const del = <T>(url: string): Promise<T> => {
  return apiClient.delete(url);
};

//
export const patch = <T>(url: string, data: unknown): Promise<T> => {
  return apiClient.patch(url, data);
};
