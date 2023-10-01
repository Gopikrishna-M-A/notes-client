import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { Layout, Card, Typography, Button } from "antd";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import baseURL from '../../components/baseURL.js'

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
  }, [subjects]);


  const deleteSubject = async (id) => {
    try{
      const res = await fetch(`${baseURL}/subject/${id}`,{
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
    <Card title="Subjects" >
      {subjects.map((subject) => (
        <div key={subject._id} className='Row'><Link  href={`subject/${subject._id}`} className="sub-grid-style W-100"><Card.Grid className="CP sub-grid ">{subject.name}</Card.Grid></Link> <DeleteOutlined className='deletebtn' onClick={()=> deleteSubject(subject._id)}/></div>
      ))}
    </Card>
  </Content>
  )
}

export default index