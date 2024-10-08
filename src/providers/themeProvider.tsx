"use client";

import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F88D58",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 48,
              boxShadow: "none",
              colorPrimaryBgHover: "#F88D58",
              colorPrimaryHover: "#302F51",
              controlOutline: "none",
              colorBorder: "#F88D58",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
};

export default ThemeProvider;
