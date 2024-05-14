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
        content: 'Ma`lumot yubotilmoqda...',
      })
      .then(() => message.success('Ma`lumot yuborildi'))
  };

  const error = async () => {
    await messageApi.open({
      type: 'error',
      content: 'Bu xatolik xabari',
    });
  };

  const { user } = useAuthContext();

  const sendForm = async (values) => {
    setSensor(false);

    try {
      await Axios.post("/api/signup", {
        userAdminName: values.userAdminName,
        userAdminEmail: values.userAdminEmail,
        userAdminPassword: values.userAdminPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      success();
    } catch (err) {
      console.error(err);
      error();
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
          name="userAdminName"
          rules={[
            {
              required: true,
              message: 'Yangi foydalanuvchi ismi',
            },
          ]}
        >
          <Input placeholder='Qarzdorning ismi' />
        </Form.Item>

        <Form.Item
          name="userAdminEmail"
          rules={[
            {
              required: true,
              message: 'Qancha qarzi borligini yozing',
            },
          ]}
        >
          <Input type='email' placeholder='Email' />
        </Form.Item>

        <Form.Item
          name="userAdminPassword"
          rules={[
            {
              required: true,
              message: 'Nima chiqardi (yoki oldi) yozing',
            },
          ]}
        >
          <Input.Password placeholder='psss' />
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
