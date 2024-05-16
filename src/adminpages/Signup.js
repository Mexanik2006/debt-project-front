import { Button, Form, Input, message } from "antd";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Axios from "../api/api";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const { setSensor } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const success = async () => {
    await messageApi
      .open({
        type: 'loading',
        content: 'Ma`lumot yuborilmoqda...',
      })
      .then(() => message.success('Ma`lumot yuborildi'));
  };

  const error = async (errMessage) => {
    await messageApi.open({
      type: 'error',
      content: errMessage || 'Xatolik yuz berdi',
    });
  };

  const { user } = useAuthContext();

  const sendForm = async (values) => {
    setSensor(false);

    try {
      await Axios.post("/api/signup", {
        userName: values.userName,
        userlogin: values.userlogin,
        email: values.email, // Adding email field
        password: values.password,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      success();
    } catch (err) {
      console.error(err);
      error(err.response?.data?.error || 'Server error');
    }

    setSensor(true);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    sendForm(values); // Send form data to Axios
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form className='form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div className="textm">
        <h3>Yangi Foydalanuvchi qo'shish:</h3>
      </div>
      <div className="inputs">
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Foydalanuvchi ismini kiriting',
            },
          ]}
        >
          <Input placeholder='Foydalanuvchi ismi' />
        </Form.Item>

        <Form.Item
          name="userlogin"
          rules={[
            {
              required: true,
              message: 'Loginni kiriting',
            },
          ]}
        >
          <Input type='text' placeholder='Login' />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Emailni kiriting',
            },
          ]}
        >
          <Input type='email' placeholder='Email' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Parolni kiriting',
            },
          ]}
        >
          <Input.Password placeholder='Parol' />
        </Form.Item>

        <div className="form_btn">
          {contextHolder}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Signup;
