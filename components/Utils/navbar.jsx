import React, { useState } from "react";
import Link from "next/link";
import {} from "@ant-design/icons";
import { Layout, Typography, Button, Space } from "antd";

const { Header } = Layout;
const { Title } = Typography;



const Navbar = () => {
  return (
    <Header className="header Row JC-SB">
      <Space className="Row JC-SB">
          <Title level={3}>
            <Link href="/" className="logo" style={{ color:"#202020" }}>College Notes</Link>
          </Title>
      </Space>
    </Header>
  );
};

export default Navbar;
