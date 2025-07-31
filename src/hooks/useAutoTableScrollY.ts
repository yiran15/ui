import { useEffect, useRef, useState } from "react";

interface UseAutoTableScrollYOptions {
  extraHeight?: number;
}

/**
 * 自动计算 AntD Table 的 scrollY 高度（自动适配表头和窗口尺寸）
 */
export function useAutoTableScrollY({ extraHeight = 0 }: UseAutoTableScrollYOptions = {}) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<string>("0px");

  const updateTableHeight = () => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const headerElement = tableElement.querySelector(".ant-table-thead");
    const headerHeight = headerElement ? (headerElement as HTMLElement).clientHeight : 0;
    const offsetTop = tableElement.offsetTop || 0;
    const totalOffset = offsetTop + headerHeight + extraHeight;
    setScrollY(`calc(100vh - ${totalOffset}px)`);
  };

  useEffect(() => {
    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);
    return () => {
      window.removeEventListener("resize", updateTableHeight);
    };
  }, [extraHeight, tableRef]);

  return { scrollY, tableRef };
}