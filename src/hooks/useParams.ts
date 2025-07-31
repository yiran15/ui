import { useSearchParams } from "react-router-dom";

export function useParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 设置或更新多个参数
  const setParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    setSearchParams(params);
  };

  // 替换所有参数（不保留原有参数）
  const replaceParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    setSearchParams(params);
  };

  // 删除某个参数
  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params);
  };

  // 清空所有参数
  const clearParams = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    getParam: (key: string) => searchParams.get(key),
    getAllParams: () => Object.fromEntries(searchParams.entries()),
    // 设置或更新多个参数
    setParams,
    replaceParams,
    removeParam,
    clearParams,
  };
}
