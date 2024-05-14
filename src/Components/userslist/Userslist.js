import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { Button, Popconfirm, Table } from 'antd';

function Userslist() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.get('/client/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [user, sensor]);

    const deleteUser = async (id) => {
        setIsLoading(true);
        setSensor(false);
        try {
            await Axios.delete(`/client/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setIsLoading(false);
            setSensor(true);
            fetchData(); // Refresh the data after deleting a user
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
            setIsLoading(false);
            setSensor(true);
        }
    };

    const confirm = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });

    return (
        <ul className='userlistt'>
            <h1 className='userlist_title'>Qarzdorlar ro'yhati</h1>
            {isLoading ? (
                <div className="loaderRotatingLines">
                    <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        color="#008000"
                        strokeWidth="5"
                        animationDuration="3000"
                        ariaLabel="rotating-lines-loading"
                    />
                </div>
            ) : (
                    <div>
                        <Table dataSource={data} className='tablesinlleuser'>
                            <Table.Column title="Ismi" dataIndex="debtorname" key="debtorname" />
                            <Table.Column title="Qancha qarzi bor" dataIndex="howmuchdebt" key="howmuchdebt" />
                            <Table.Column title="Nima olgan" dataIndex="whatcameout" key="whatcameout" />
                            <Table.Column title="Telefon raqami" dataIndex="phonenumber" key="phonenumber" render={(text, record) => (
                            <span>+{record.phonenumber}</span>
                        )} />
                            <Table.Column title="Taxrirlash" dataIndex="actions" key="actions" render={(text, record) => (
                                <Link className='link' to={`/debt/${record._id}`}>
                                Edit
                            </Link>
                            )} />
                            <Table.Column title="O'chirish" dataIndex="actions" key="actions" render={(text, record) => (
                                <Popconfirm
                                    title="Qarzdorni o'chirmoqchimisiz?"
                                    description={`Siz ${record.debtorname} ni o'chirmoqdasiz...`}
                                    onConfirm={() => {
                                        confirm().then(() => deleteUser(record._id));
                                    }}
                                    onCancel={() => console.log('Bekor qilindi')}
                                    onOpenChange={() => console.log('open change')}
                                    okText="Ha"
                                    cancelText="Yo'q"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            )} />
                        </Table>
                        <Table dataSource={data} className='tablesinlleuser_media'>
                            <Table.Column title="Ismi" dataIndex="debtorname" key="debtorname" />
                            <Table.Column title="Qancha qarzi bor" dataIndex="howmuchdebt" key="howmuchdebt" />
                            <Table.Column title="Taxrirlash" dataIndex="actions" key="actions" render={(text, record) => (
                                <Link className='link' to={`/debt/${record._id}`}>
                                    Edit
                                </Link>
                            )} />
                        </Table>
                    </div>
            )}
        </ul>
    );
}

export default Userslist;
