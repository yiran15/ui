import { MessageInstance } from "antd/es/message/interface";
import { AxiosError } from "axios";

export type ParsedError = {
  message: string;
  code?: number | string;
  raw?: unknown;
};

/**
 * 解析任意错误对象为统一结构。
 * 支持 AxiosError（包含后端 ApiResponse），原生 Error，string，以及其他未知类型。
 */
export function Error(err: unknown, app: MessageInstance) {
  let errorMsg = "network error, please try again later";
  if ((err as AxiosError)?.isAxiosError) {
    const axiosErr = err as AxiosError;
    const data = axiosErr.response?.data;
    // 如果后端返回了对象类型的 body，尝试从中提取常见字段
    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      errorMsg =
        (typeof obj.error === "string" && obj.error) ||
        (typeof obj.message === "string" && obj.message) ||
        JSON.stringify(obj);
    }
  }
  console.log("error:", err);
  app.error(errorMsg);
}

export default Error;
