import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
export interface SortParams {
  page: string;
  pageSize: string;
}

export default function useSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (page) {
      newParams.set("page", page);
    }
    if (pageSize) {
      newParams.set("pageSize", pageSize);
    }
    setSearchParams(newParams);
  }, [searchParams, page, pageSize, setSearchParams]);

  return useMemo(() => {
    return {
      page,
      pageSize,
      setSearch: (params: SortParams) => {
        const newParams = new URLSearchParams(searchParams);
        if (params.page) {
          newParams.set("page", params.page);
        }
        if (params.pageSize) {
          newParams.set("pageSize", params.pageSize);
        }
        setSearchParams(newParams);
      },
    };
  }, [searchParams, page, pageSize, setSearchParams]);
}
