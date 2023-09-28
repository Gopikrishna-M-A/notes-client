import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Button } from "antd";
import Link from "next/link";
import {
  FileTextOutlined,
  SearchOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import baseURL from '../components/baseURL.js'

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;



function LandingPage() {

  const [semester, setSemester] = useState([])

  useEffect (() => {
    const fetchSemester = async () => {
      const res = await fetch(`${baseURL}/semester`,{
        method: "GET"
      }).then((res) => res.json()).then((data) => {
        setSemester(data)
      });
    }
    fetchSemester()
  }, []);


  return (
    <Layout style={{ padding: "10px 100px" }}>
      <Content style={{ padding: "50px" }}>
        <div style={{ textAlign: "center" }}>
          <Title>Welcome to College Notes</Title>
          <Paragraph>
            Find and share notes for different subjects and semesters.
          </Paragraph>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            style={{ marginRight: "20px" }}
          >
            Search Notes
          </Button>
          <Button
            type="default"
            icon={<FileTextOutlined />}
            size="large"
            href="#"
          >
            Upload Notes
          </Button>
        </div>
      </Content>

      <Content >
        <Card title="Semester" className="sem-cards-wrapper">
          {semester.map((sem) => (
              <Link key={sem._id} href={"/semester/" + sem._id} className="grid-style">
                <Card.Grid className="CP grid">{`S${sem.name}`}</Card.Grid>
              </Link>
          ))}          
        </Card>
      </Content>
    </Layout>
  );
}

export default LandingPage;
