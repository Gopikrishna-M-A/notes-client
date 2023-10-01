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
    <Layout className="page">
      <Content >
        <div style={{ textAlign: "center" }}>
          <Title>Welcome to College Notes</Title>
          <Paragraph>
            Find and share notes for different subjects and semesters.
          </Paragraph>
          <div className="Row MT-10 wrap">
          <Link
          href={'/admin'}
          >
          <Button
            type="default"
            icon={<FileTextOutlined />}
            size="large"
          >
            Upload Notes
          </Button>
          </Link>
          
          </div>
          
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
