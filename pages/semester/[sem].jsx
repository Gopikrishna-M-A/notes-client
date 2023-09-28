import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { Layout, Card, Typography, Button } from "antd";
import Link from "next/link";
import {
  FileTextOutlined,
  SearchOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import baseURL from "@/components/BaseURL";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const index = () => {

  const [subjects, setSubjects] = useState([])
  const router = useRouter();
  const { sem } = router.query;

  useEffect (() => {
    const fetchSubjects = async () => {
      const res = await fetch(`${baseURL}/subject/sem/${sem}`,{
        method: "GET"
      }).then((res) => res.json()).then((data) => {
        setSubjects(data)
      });
    }
    fetchSubjects()
  }, []);

  return (
    <Content className="subject-cards-wrapper" style={{ padding: "10px 100px" }}>
    <Card title="Subjects" >
      {subjects.map((subject) => (
        <Link key={subject._id} href={`subject/${subject._id}`} className="sub-grid-style"><Card.Grid className="CP sub-grid">{subject.name}</Card.Grid></Link>
      ))}
    </Card>
  </Content>
  )
}

export default index