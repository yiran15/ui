// components/ThemeProvider.tsx
import { App, ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useEffect, useMemo, useState } from "react";

export const GlobalContext = createContext<{
  theme: "light" | "dark";
  setTheme: (mode: "light" | "dark") => void;
}>({
  theme: "light",
  setTheme: () => {},
});

const THEME_KEY = "app-theme";

function getDefaultTheme(): "light" | "dark" {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "light";
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">(getDefaultTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const contextValue = useMemo(
    () => ({ theme: mode, setTheme: setMode }),
    [mode]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
          },
          algorithm:
            mode === "dark"
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          components: {
            Table: {
              fontSize: 13,
              headerBorderRadius: 8,
              cellPaddingInline: 4,
              cellPaddingInlineMD: 4,
              cellPaddingInlineSM: 4,
              cellPaddingBlock: 4,
              cellPaddingBlockMD: 4,
              cellPaddingBlockSM: 4,
            },
            Pagination: {
              fontSize: 13,
            },
            Card: {
              padding: 16,
              paddingLG: 16,
              paddingSM: 12,
            },
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}
