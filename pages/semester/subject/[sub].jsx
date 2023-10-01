import React ,{ useState, useEffect } from 'react'
import { useRouter } from "next/router";

import { Layout, Card, Typography, Button } from "antd";
import Link from "next/link";
import {
  DeleteOutlined
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
    }, [modules]);

    const deleteModule = async (id) => {
      try{
        const res = await fetch(`${baseURL}/module/${id}`,{
          method: "DELETE"
        }).then((res) => res.json()).then((data) => {
          console.log(data)
        });
      }catch(error){
        console.error("An error occurred:", error);
      }
    }
  


  return (
    <Content className="subject-cards-wrapper page" >
    <Card title="Module" >
      {modules.map((module) => (
        <div key={module._id} className='Row'><Link  href={`module/${module._id}`} className="sub-grid-style W-100"><Card.Grid className="CP sub-grid">Module {module.name}</Card.Grid></Link> <DeleteOutlined className='deletebtn' onClick={()=> deleteModule(module._id)}/></div>
      ))} 
    </Card>
  </Content>
  )
}

export default index