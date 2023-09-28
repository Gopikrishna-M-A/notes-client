import React, { use, useEffect, useState } from "react";
import { Button, Select, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import baseURL from "@/components/BaseURL";


const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values) => {
  const formData = new FormData();
  // console.log("Success:", values);

  formData.append("pdf", values.pdf[0].originFileObj);
  formData.append("name", values.module);
  formData.append("subject", values.subject);
  // console.log("formData:", formData);

  try {
    const response = fetch(`${baseURL}/module`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
      });
  } catch (err) {
    console.log("err");
  }
};

const onFinishSubject = (values) => {
  try {
    const response = fetch(`${baseURL}/subject`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);  
      });
  } catch (err) {
    console.log("err");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};




const index = () => {
  const [semester, setSemester] = useState([]);
  const [semesterId, setSemesterId] = useState();
  const [subject, setSubject] = useState([]);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setSemesterId(value);
  };

  useEffect(() => {
    const fetchSemester = async () => {
      try {
        const response = fetch(`${baseURL}/semester`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            setSemester(data);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSemester();
  }, []);


  useEffect(() => {

      const fetchSubject = async () => {
        try {
          const response = fetch(`${baseURL}/subject`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              const sub = data.filter((subject) => subject.semester === semesterId);
              setSubject(sub);
            });
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }

      fetchSubject();
  }, [semesterId])




  const options = semester.map((item) => ({
    value: item._id,
    label: `S${item.name}`,
  }));

  const optionsSubject = subject.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <div style={{ padding: "10px 100px" }}>
      <Form
        name="AddSubject"
        style={{ maxWidth: 400 }}
        onFinish={onFinishSubject}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="semester"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Semester"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Subject"></Input>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Subject
          </Button>
        </Form.Item>
      </Form>

      {/* ------------------------------------------------------- */}

      <Form
        name="basic"
        style={{ maxWidth: 400 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="Semester">
          <Select
            placeholder="Semester"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>

        <Form.Item name="subject">
          <Select
            placeholder="Subject"
            options={optionsSubject}
          />
        </Form.Item>

        <Form.Item name="module">
          <Select
            placeholder="Module"
            options={
              [
              {
                value: "1",
                label: "Module 1",
              },
              {
                value: "2",
                label: "Module 2",
              },
              {
                value: "3",
                label: "Module 3",
              },
              {
                value: "4",
                label: "Module 4",
              },
              {
                value: "5",
                label: "Module 5",
              },
              {
                value: "6",
                label: "Module 6",
              },
              {
                value: "7",
                label: "Module 7",
              },
              {
                value: "8",
                label: "Module 8",
              },
            ]
            }
          />
        </Form.Item>

        <Form.Item
          name="pdf"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Module
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default index;
