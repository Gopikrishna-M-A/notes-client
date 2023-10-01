import React, { useEffect, useState } from "react";
import { Button, Select, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import baseURL from "../../components/baseURL.js";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const index = () => {
  const [semester, setSemester] = useState([]);
  const [semesterId, setSemesterId] = useState();
  const [subject, setSubject] = useState([]);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();




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
            const sub = data.filter(
              (subject) => subject.semester === semesterId
            );
            setSubject(sub);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchSubject();
  }, [semesterId]);

  const Success = (msg) => {
    message.success(msg);
  };
  const error = (msg) => {
    message.error(msg);
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
          if (data.error) error(data.error);
          else Success(data.success);
          form2.resetFields();
        });
    } catch (err) {
      error("An error occurred");
    }
  };

  const onFinishSubject = (values) => {
    try {
      const response = fetch(`${baseURL}/subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) error(data.error);
          else Success(data.success);
          form1.resetFields();
        });
    } catch (err) {
      error("An error occurred");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setSemesterId(value);
  };


  const options = semester.map((item) => ({
    value: item._id,
    label: `S${item.name}`,
  }));

  const optionsSubject = subject.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <div className="page">
      <Form
        form={form1}
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
        form={form2}
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
          <Select placeholder="Subject" options={optionsSubject} />
        </Form.Item>

        <Form.Item name="module">
          <Select
            placeholder="Module"
            options={[
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
            ]}
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
