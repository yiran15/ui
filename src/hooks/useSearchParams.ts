// useSearchParamsHook.ts
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

type SearchConfig = {
  sortKey?: string;
  directionKey?: "asc" | "desc" | undefined;
  defaultSort?: string;
  defaultDirection?: "asc" | "desc" | undefined;
};

export default function useSearchParamsHook(config?: SearchConfig) {
  const {
    sortKey = "sort",
    directionKey = "direction",
    defaultSort = "",
    defaultDirection = "asc",
  } = config || {};

  const [searchParams, setSearchParams] = useSearchParams();

  return useMemo(() => {
    const currentSort = searchParams.get(sortKey) || defaultSort;
    const currentDirection = searchParams.get(directionKey) || defaultDirection;

    return {
      sort: currentSort,
      direction: currentDirection,
      sortKey,
      directionKey,

      setSearch: (sort: string, direction: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (sort) {
          newParams.set(sortKey, sort);
          newParams.set(directionKey, direction);
        } else {
          newParams.delete(sortKey);
          newParams.delete(directionKey);
        }

        setSearchParams(newParams);
      },

      clearSearch: () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(sortKey);
        newParams.delete(directionKey);
        setSearchParams(newParams);
      },
    };
  }, [
    searchParams,
    setSearchParams,
    sortKey,
    directionKey,
    defaultSort,
    defaultDirection,
  ]);
}
