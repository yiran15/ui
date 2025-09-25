import { Api } from "./api/api";

export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  msg?: string;
  error: string;
  requestId?: string;
}

export interface Options {
  label: string;
  value: string;
}

export interface PolicyOptions extends Options {
  rawData: Api;
}
