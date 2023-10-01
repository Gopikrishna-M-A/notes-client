import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Layout, Button, Typography, Space } from "antd";


import {
  LeftOutlined,
  RightOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function PDFViewer({ pdf, mod }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      setPhone(true);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setLoading(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }



  return (
    <div className="page">
      <Title level={3}>Module {mod}</Title>

        <div>
          <Button onClick={goToPreviousPage} disabled={pageNumber <= 1} icon={<LeftOutlined /> }/>
          <Button onClick={goToNextPage} disabled={pageNumber >= numPages} icon={<RightOutlined /> } style={{ marginLeft: "20px" }}/>
    
          <span style={{ marginLeft: "20px" }}>{pageNumber}</span>
          <span> / {numPages}</span>
        </div>
      <Content >

        <div className="MT-10">
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            renderMode="canvas"
          >
            <Page
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              onRenderError={() => setLoading(false)}
              {...phone ? { width: 300 } : { width: 600 }}
            />
          </Document>
        </div>
      </Content>
    </div>
  );
}
