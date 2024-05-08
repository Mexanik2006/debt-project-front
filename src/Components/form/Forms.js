import Axios from '../../api/api';
import React, { useContext } from 'react';
import "./Form.css";
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button, Form, Input, InputNumber, message } from 'antd';

function Forms() {
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
            await Axios.post("/client/create", {
                debtorname: values.debtorname,
                howmuchdebt: values.howmuchdebt,
                whatcameout: values.whatcameout,
                phonenumber: values.phonenumber,
                comments: [],
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
                <h3>Yangi qarzdor qo'shish:</h3>
            </div>
            <div className="inputs">
                <Form.Item
                    name="debtorname"
                    rules={[
                        {
                            required: true,
                            message: 'Qarzdorning ismini kiriting!',
                        },
                    ]}
                >
                    <Input placeholder='Qarzdorning ismi' />
                </Form.Item>

                <Form.Item
                    name="howmuchdebt"
                    rules={[
                        {
                            required: true,
                            message: 'Qancha qarzi borligini yozing',
                        },
                    ]}
                >
                    <Input type='number' placeholder='Qancha qarzi bor.' />
                </Form.Item>

                <Form.Item
                    name="whatcameout"
                    rules={[
                        {
                            required: true,
                            message: 'Nima chiqardi (yoki oldi) yozing',
                        },
                    ]}
                >
                    <Input placeholder='Nima chiqardi (yoki oldi)' />
                </Form.Item>

                <Form.Item
                    name="phonenumber"
                    rules={[
                        {
                            required: true,
                            message: 'Telefon raqamini yozing',
                        },
                    ]}
                >
                    <Input type='number' placeholder='Telefon raqami' />
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
    )
}

export default Forms;
