import React, { useState } from "react";
import Link from "next/link";
import {} from "@ant-design/icons";
import { Layout, Typography, Button, Space } from "antd";

const { Header } = Layout;
const { Title } = Typography;



const Navbar = () => {
  return (
    <Header className="header">
      <Space className="Row JC-SB">
          <Title level={3}>
            <Link href="/" >College Notes</Link>
          </Title>
      </Space>
    </Header>
  );
};

export default Navbar;
