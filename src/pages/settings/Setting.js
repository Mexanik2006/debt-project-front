import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import axios from '../../api/api'; // assuming you have axios installed

function Setting() {
    const { Title } = Typography;
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        // Fetch users from the backend
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);
    console.log(selectedUser)

    const handleEdit = (values) => {
        axios.put(`/api/users/${selectedUser?._id}`, values)
            .then(response => {
                console.log("first")
            })
            .catch(error => {
                setError(error.message);
            });
    };
    return (
        <div>
            <Card className='card_settings'>
                <Title level={2} className='card_settings_title'>O'zingizni ma'lumotingizni o'zgartiring!</Title>
                <Form autoComplete="off" layout="vertical" onFinish={handleEdit}>
                    <Form.Item label="Username" name="userName" initialValue={selectedUser?.userName} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Login" name="userlogin" initialValue={selectedUser?.userlogin} rules={[{ required: true, type: 'text' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button type="primary" htmlType="submit">
                            Saqlash
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Setting;
