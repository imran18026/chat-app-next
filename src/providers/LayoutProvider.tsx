import React from "react";
import { Content } from "antd/es/layout/layout";
import { Header } from "./LayoutComponents/header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
};

export default LayoutProvider;
