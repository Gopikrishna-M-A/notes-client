import React, { useEffect, useState } from "react";
import PdfViewer from "../../../../components/PdfViewer";
import { Layout, Card, Typography, Button } from "antd";
import { useRouter } from "next/router";
import baseURL from "../../../../components/baseURL.js";

const { Header, Content, Footer } = Layout;

const index = () => {
  const router = useRouter();
  const { mod } = router.query;
  const [module, setModule] = useState([]);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await fetch(`${baseURL}/module/${mod}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            setModule(data);
          });
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchModule();
  }, []);

  return (
    <Content className="pdf-view" style={{ padding: "10px 100px" }}>
      <PdfViewer
        mod={module.name}
        pdf={`http://localhost:4000/module/getpdf/${module.pdfPath}`}
      ></PdfViewer>
    </Content>
  );
};

export default index;
