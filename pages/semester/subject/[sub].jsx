import React ,{ useState, useEffect } from 'react'
import { useRouter } from "next/router";

import { Layout, Card, Typography, Button } from "antd";
import Link from "next/link";
import {
  FileTextOutlined,
  SearchOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import baseURL from '../../../components/baseURL.js'

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const index = () => {
    const [modules, setModules] = useState([])
    const router = useRouter();
    const { sub } = router.query;

    useEffect (() => {
    const fetchModules = async () => {
      try {
        const res = await fetch(`${baseURL}/module/sub/${sub}`,{
          method: "GET"
        }).then((res) => res.json()).then((data) => {
          setModules(data)
        })
      }catch(err){  
        console.log("err",err)
      }
    }   
    fetchModules()
    }, []);


  return (
    <Content className="subject-cards-wrapper" style={{ padding: "10px 100px" }}>
    <Card title="Module" >
      {modules.map((module) => (
        <Link key={module._id} href={`module/${module._id}`} className="sub-grid-style"><Card.Grid className="CP sub-grid">Module {module.name}</Card.Grid></Link>
      ))} 
    </Card>
  </Content>
  )
}

export default index