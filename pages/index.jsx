import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Button, Spin } from "antd";
import Link from "next/link";
import {
  FileTextOutlined,
} from "@ant-design/icons";
import baseURL from '../components/baseURL.js'

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;



function LandingPage() {

  const [semester, setSemester] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    const fetchSemester = async () => {
      const res = await fetch(`${baseURL}/semester`,{
        method: "GET"
      }).then((res) => res.json()).then((data) => {
        setSemester(data)
        setLoading(false)
      });
    }
    fetchSemester()
  }, []);


  return (
    <Layout className="page home-page"  >
        <div style={{ textAlign: "center",marginBottom:"30px",padding:"30px" }}>
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

      <Spin spinning={loading} > 
      <Content >
        <Card title="Semester" className="sem-cards-wrapper">
          {semester.map((sem) => (
              <Link key={sem._id} href={"/semester/" + sem._id} className="grid-style">
                <Card.Grid className="CP grid">{`S${sem.name}`}</Card.Grid>
              </Link>
          ))}          
        </Card>
      </Content>
      </Spin>
    </Layout>
  );
}

export default LandingPage;
