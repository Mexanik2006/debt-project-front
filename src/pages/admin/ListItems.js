import React, { useEffect, useState } from 'react';
import axios from '../../api/api';
import { Button, Table, Modal, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

function ListItems() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
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

    const deleteUser = (id) => {
        axios.delete(`/api/users/${id}`)
            .then(response => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const showModal = (user) => {
        setVisible(true);
        setSelectedUser(user);
    };

    const handleCancel = () => {
        setVisible(false);
        setSelectedUser(null);
    };

    const handleEdit = (values) => {
        axios.put(`/api/users/${selectedUser._id}`, values)
            .then(response => {
                setUsers(users.map(user => user._id === selectedUser._id ? { ...user, ...values } : user));
                setVisible(false);
                setSelectedUser(null);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="">
            <h1>Foydalanuvchilar ro'yhati</h1>
            <ul>
                <Table dataSource={users} className='tablesinlle'>
                    <Table.Column title="T/R" dataIndex="amount" key="amount" render={(text, record, index) => (
                        <span>{index + 1}</span>
                    )} />
                    <Table.Column title="Ismi" dataIndex="info" key="info" render={(text, record) => (
                        <span>{record.userName}</span>
                    )} />
                    <Table.Column title="Login" dataIndex="info" key="info" render={(text, record) => (
                        <span>{record.userlogin}</span>
                    )} />
                    <Table.Column title="Email" dataIndex="info" key="info" render={(text, record) => (
                        <span>{record.email}</span>
                    )} />
                    <Table.Column title="Edit" dataIndex="updatedAt" key="updatedAt" render={(text, record) => (
                        <Button onClick={() => showModal(record)}>Edit</Button>
                    )} />
                    <Table.Column title='Delete' render={(text, record) => (
                        <Button danger onClick={() => deleteUser(record._id)}>Delete</Button>
                    )} />
                </Table>

                <Modal
                    title="Edit User"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form {...layout} onFinish={handleEdit}>
                        <Form.Item label="Username" name="userName" initialValue={selectedUser?.userName} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Login" name="userlogin" initialValue={selectedUser?.userlogin} rules={[{ required: true, type: 'text' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" initialValue={selectedUser?.email} rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password" initialValue={selectedUser?.password} rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

            </ul>
        </div >
    );
}

export default ListItems;
