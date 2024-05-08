import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { Button, Popconfirm, Table, message } from 'antd';

function Userslist() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();


    console.log(data);

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
            const response = await Axios.delete(`/client/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data); // Assuming the server sends a response with the deleted user information
            setIsLoading(false);
            setSensor(true);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
            setIsLoading(false);
            setSensor(true);
        }
    };

    //


    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                // Buyruqning to'g'ri bajarilganini anglatamiz
                resolve();
            }, 3000); // 3 sekund kutamiz
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
                        wrapperStyle={{}}
                        wrapperClass=""
                    /></div>
            ) : (
                    <div className="">
                    <Table dataSource={data} className='tablesinlleuser'
                    // pagination={{
                    //     position: [],
                    // }}
                    >
                        <Table.Column title="Ismi" dataIndex="amount" key="amount" render={(text, record) => (
                            <span>{record.debtorname}</span>
                        )} />

                        <Table.Column title="Qancha qarzi bor" dataIndex="amount" key="amount" render={(text, record) => (
                            <span>{record.howmuchdebt}</span>
                        )} />

                        <Table.Column title="Nima olgan" dataIndex="amount" key="amount" render={(text, record) => (
                            <span>{record.whatcameout}</span>
                        )} />

                        <Table.Column title="Telefon raqami" dataIndex="amount" key="amount" render={(text, record) => (
                            <span>+{record.phonenumber}</span>
                        )} />

                        <Table.Column title="Taxrirlash" dataIndex="amount" key="amount" render={(text, record) => (
                            <Link className='link' to={`/debt/${record._id}`} >
                                Edit
                            </Link>
                    )} />

                    <Table.Column title="O'chirish" dataIndex="amount" key="amount" render={(text, record) => (
                                // <button onClick={() => deleteUser(record._id)} style={{ marginLeft: "10px" }}>Delete</button>


                                // Keyingi qatorda Popconfirm komponentini ishlatamiz
                                <Popconfirm
                                    title="Qarzdorni o'chirmoqchimisiz?"
                                    description={`Siz ${record.debtorname} ni o'chirmoqdasiz...`}
                                    onConfirm={() => {
                                        confirm().then(() => deleteUser(record._id));
                                    }}
                                    onCancel={() => console.log('Bekor qilindi')}
                                    onOpenChange={() => console.log('open change')}
                                    okText="Ha"
                                    cancelText="Yoq"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>



                    )} />
                        </Table>

                        <Table dataSource={data} className='tablesinlleuser_media'
                        >
                            <Table.Column title="Ismi" dataIndex="amount" key="amount" render={(text, record) => (
                                <span>{record.debtorname}</span>
                            )} />

                            <Table.Column title="Qancha qarzi bor" dataIndex="amount" key="amount" render={(text, record) => (
                                <span>{record.howmuchdebt}</span>
                            )} />

                            <Table.Column title="Taxrirlash" dataIndex="amount" key="amount" render={(text, record) => (
                                <Link className='link' to={`/debt/${record._id}`} >
                                    Edit
                                </Link>
                            )} />

                            {/* <Table.Column title="O'chirish" dataIndex="amount" key="amount" render={(text, record) => (
                                // <button onClick={() => deleteUser(record._id)} style={{ marginLeft: "10px" }}>Delete</button>


                                // Keyingi qatorda Popconfirm komponentini ishlatamiz
                                <Popconfirm
                                    title="Qarzdorni o'chirmoqchimisiz?"
                                    description={`Siz ${record.debtorname} ni o'chirmoqdasiz...`}
                                    onConfirm={() => {
                                        confirm().then(() => deleteUser(record._id));
                                    }}
                                    onCancel={() => console.log('Bekor qilindi')}
                                    onOpenChange={() => console.log('open change')}
                                    okText="Ha"
                                    cancelText="Yoq"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>



                            )} /> */}
                        </Table>

                        {/* <Table dataSource={data} className='tablesinlleuser_media_600px'
                        >
                            <Table.Column title="Ismi" dataIndex="amount" key="amount" render={(text, record) => (
                                <span>{record.debtorname}</span>
                            )} />

                            <Table.Column title="Qancha qarzi bor" dataIndex="amount" key="amount" render={(text, record) => (
                                <span>{record.howmuchdebt}</span>
                            )} />

                            <Table.Column title="Taxrirlash" dataIndex="amount" key="amount" render={(text, record) => (
                                <Link className='link' to={`/debt/${record._id}`} >
                                    Edit
                                </Link>
                            )} />

                            <Table.Column title="O'chirish" dataIndex="amount" key="amount" render={(text, record) => (
                                // <button onClick={() => deleteUser(record._id)} style={{ marginLeft: "10px" }}>Delete</button>


                                // Keyingi qatorda Popconfirm komponentini ishlatamiz
                                <Popconfirm
                                    title="Qarzdorni o'chirmoqchimisiz?"
                                    description={`Siz ${record.debtorname} ni o'chirmoqdasiz...`}
                                    onConfirm={() => {
                                        confirm().then(() => deleteUser(record._id));
                                    }}
                                    onCancel={() => console.log('Bekor qilindi')}
                                    onOpenChange={() => console.log('open change')}
                                    okText="Ha"
                                    cancelText="Yoq"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>



                            )} />
                        </Table> */}
                    </div>
            )}
        </ul>
    );
}

export default Userslist;
