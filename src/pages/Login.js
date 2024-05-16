import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Button, Card, Form, Input, Typography } from "antd";

const Login = () => {
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (values) => {
    await login(values.userlogin, values.password);
  };

  const { Title } = Typography;

  return (
    <div className="login-container"
      style={{
        // display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        maxWidth: '800px',
        margin: '30px auto'
      }}
    >
      <Card
        style={{
          Width: '800px',
        }}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          value='large'
          style={{
            Width: '800px',
          }}
        >
          <Form.Item>
            <Title level={2}>Kirish</Title>
          </Form.Item>

          <Form.Item
            label="userlogin:"
            name="userlogin"
            rules={[
              {
                required: true,
                message: 'Iltimos Kirish uchun loginingizni kiriting...',
              },
            ]}
          >
            <Input placeholder="example" />
          </Form.Item>

          <Form.Item
            label="Parol:"
            name="password"
            rules={[
              {
                required: true,
                message: 'Iltimos kirish uchun Parollingizni kiriting...',
              },
            ]}
          >
            <Input.Password placeholder="****" />
          </Form.Item>  

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Kirish
            </Button>
          </Form.Item>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Card>
    </div>
  );
};

export default Login;
