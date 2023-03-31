import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import { Modal, Checkbox, Form, Input, Button } from "antd";
import axios from "axios";

import "./style.scss";

const SignModal = forwardRef(function SignModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signup");

  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        signin,
        signup,
      };
    },
    []
  );

  const handleShowModal = useCallback((status) => {
    setIsModalOpen(status);
  }, []);

  const signin = useCallback(() => {
    setModalType("signin");
    handleShowModal(true);
  }, []);

  const signup = useCallback(() => {
    setModalType("signup");
    handleShowModal(true);
  }, []);

  const sendForm = useCallback(() => {
    if (modalType === "signup") {
      axios
        .post(`${process.env.API_URL}/auth/signup`, form.getFieldsValue())
        .then((res) => {
          console.log("Modal - sendForm", res);
          handleShowModal(false);
        });
    } else {
      axios
        .post(`${process.env.API_URL}/auth/signin`, form.getFieldsValue())
        .then((res) => {
          console.log("Modal - sendForm", res);
          handleShowModal(false);
        });
    }
  }, [modalType]);

  const onFinish = (values) => {
    sendForm();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={modalType === "signup" ? "Inscription" : "Connexion"}
      open={isModalOpen}
      onCancel={() => handleShowModal(false)}
      footer={null}
    >
      {modalType === "signup" && (
        <Form
          className="sign-form"
          form={form}
          layout="vertical"
          name="signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Prénom"
            name="firstname"
            rules={[
              { required: true, message: "Veuillez renseigner votre prénom" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nom"
            name="lastname"
            rules={[
              { required: true, message: "Veuillez renseigner votre nom" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pseudo"
            name="username"
            rules={[
              { required: true, message: "Veuillez renseigner votre pseudo" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Veuillez renseigner un email valide",
              },
              { required: true, message: "Veuillez renseigner votre email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez renseigner votre mot de passe",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirmer le mot de passe"
            dependencies={["password"]}
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Veuillez confirmer votre mot de passe",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Les deux mots de passes ne correspondent pas !")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="form-footer">
            <Form.Item>
              <Button
                key="back"
                onClick={() => handleShowModal(false)}
                className="button"
              >
                Annuler
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Envoyer
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
      {modalType === "signin" && (
        <Form
          className="sign-form"
          form={form}
          layout="vertical"
          name="signin"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Veuillez renseigner un email valide",
              },
              { required: true, message: "Veuillez renseigner votre email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="form-footer">
            <Form.Item>
              <Button
                key="back"
                onClick={() => handleShowModal(false)}
                className="button"
              >
                Annuler
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Envoyer
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
});

export default SignModal;
