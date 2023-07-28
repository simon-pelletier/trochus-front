import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Slider,
  Row,
  Col,
  Upload,
  message,
} from "antd";
const { Dragger } = Upload;

import "./style.scss";

function AddItem() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [inputValueEstimation, setInputValueEstimation] = useState(1);

  const conditionOptions = [
    { label: "Neuf", value: "new" },
    { label: "Excellent état", value: "very_good" },
    { label: "Bon état", value: "good" },
    { label: "État correct", value: "average" },
    { label: "Mauvais état", value: "bad" },
  ];

  const formatter = (value) => `${value}%`;

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.API_URL}/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const onChangeEstimation = (newValue) => {
    setInputValueEstimation(newValue);
    form.setFieldValue("estimation", newValue);
  };

  const props = {
    name: "images",
    multiple: true,
    action: (file) => console.log(file),
    maxCount: 5,
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      return false || isJpgOrPng ? false : Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;
      console.log("info.file", status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const sendForm = () => {

    let formData = new FormData();

    if (!form.getFieldValue("image")) {
      form.setFieldValue("image", []);
    } else {
      form.getFieldValue("image").fileList.forEach((image) => {
        formData.append("images", image.originFileObj);
      });
    }
    
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values.categories.forEach((category) => {
          categories.forEach((categoryItem) => {
            if (`${categoryItem.id}` === category) {
              formData.append("categories", categoryItem.id);
            }
          });
        });

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("estimation", values.estimation);
        formData.append("condition", values.condition);
        formData.append("userId", currentUser.userInfo.id);

        axios
          .post(`${process.env.API_URL}/items`, formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
          )
          .then((res) => {
            console.log("res.data", res.data);
            navigate("/items");
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>Ajouter un objet</h1>
      </div>
      <div className="content">
        <Form form={form} name="add-item" layout="vertical">
          <Form.Item
            label="Nom de l'objet"
            name="name"
            rules={[
              {
                required: true,
                message: "Veuillez saisir un nom pour votre objet",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description de l'objet"
            name="description"
            rules={[
              {
                required: true,
                message: "Veuillez saisir une description pour votre objet",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image(s) de l'objet"
            name="image"
            rules={[
              {
                required: true,
                message: "Veuillez saisir une image pour votre objet",
              },
            ]}
          >
            <Dragger
              {...props}
              className="upload-list-inline"
              listType="picture"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label="Catégories de l'objet"
            name="categories"
            rules={[
              {
                required: true,
                message:
                  "Veuillez saisir une ou des catégorie(s) pour votre objet",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Selectionnez une ou plusieurs catégories"
              options={categories.map((category) => {
                return { label: category.label, value: `${category.id}` };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Etat de l'objet"
            name="condition"
            initialValue={"new"}
            rules={[
              {
                required: true,
                message: "Veuillez saisir un état pour votre objet",
              },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              // defaultValue={"new"}
              placeholder="Selectionnez un état"
              options={conditionOptions}
            />
          </Form.Item>

          <Form.Item
            label="Valeur de l'objet"
            name="estimation"
            rules={[
              {
                required: true,
                message: "Veuillez saisir une valeur pour votre objet",
              },
            ]}
          >
            <Row>
              <Col span={3}>
                <InputNumber
                  min={1}
                  max={2000}
                  style={{
                    margin: "0 16px",
                  }}
                  value={inputValueEstimation}
                  onChange={onChangeEstimation}
                />
              </Col>
              <Col span={21}>
                <Slider
                  min={1}
                  max={2000}
                  onChange={onChangeEstimation}
                  tooltip={{
                    formatter,
                  }}
                  value={
                    typeof inputValueEstimation === "number"
                      ? inputValueEstimation
                      : 0
                  }
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <div className="form-footer">
              <Button
                danger
                onClick={() => {
                  navigate("/items");
                }}
                className="button"
              >
                Annuler
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={sendForm}
                className="button"
              >
                Envoyer
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddItem;
