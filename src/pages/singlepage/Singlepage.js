import React, { useState, useEffect, useContext } from 'react';
import "./Singlepage.css";
import Axios from '../../api/api';
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button, Form, Input, Table } from 'antd';
import { Typography } from 'antd';
import { FaAngleDoubleLeft } from "react-icons/fa";

function Singlepage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext);
    const { user } = useAuthContext();
    const [ayiruvQiymat, setAyiruvQiymat] = useState({
        howmuchdebt: 0,
        info: ""
    });
    const [qoshuvQiymat, setQoshuvQiymat] = useState({
        howmuchdebt: 0,
        info: ""
    });

    const [userData, setUserData] = useState([]);

    const getApi = async () => {
        setIsLoading(true);
        if (user) {
            try {
                const response = await Axios.get("/client/get", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setUserData(response.data.find(us => us._id === id));
                setIsLoading(false);
            } catch (error) {
                console.log("error bor", error);
            }
        }
    };

    useEffect(() => {
        getApi();
    }, [user, sensor, id]);

    const ayirish = async () => {
        setSensor(false);
        setIsLoading(true);
        try {
            await Axios.put(`/client/minus/${id}`, ayiruvQiymat, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setIsLoading(false);
            setSensor(true);
            setQoshuvQiymat({ howmuchdebt: 0, info: "" });
            setAyiruvQiymat({ howmuchdebt: 0, info: "" });
        } catch (error) {
            console.log("error bor", error);
            setIsLoading(false);
        }
    };

    const qoshish = async () => {
        setSensor(false);
        setIsLoading(true);
        try {
            await Axios.put(`/client/plus/${id}`, qoshuvQiymat, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setIsLoading(false);
            setSensor(true);
            setQoshuvQiymat({ howmuchdebt: "", info: "" });
            setAyiruvQiymat({ howmuchdebt: "", info: "" });
        } catch (error) {
            console.log("error bor", error);
            setIsLoading(false);
        }
    };

    const deleteUser = async () => {
        setIsLoading(true);
        setSensor(false);
        try {
            const response = await Axios.delete(`/client/delete/${userData._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response.data); // Assuming the server sends a response with the deleted user information
        } catch (error) {
            console.error(error);
            console.log('Error occurred while deleting user');
        }
        setIsLoading(false);
        setSensor(true);
        navigate("/");
    };
    const { Title } = Typography;

    return (
        <div>
            <div className="home_link">
                <Link to={'/'}>
                    <FaAngleDoubleLeft />
                </Link>
            </div>

            <div className="singleForm">

                <Form initialValues={{
                    remember: true,
                }}
                    autoComplete="off">


                    <Form.Item
                        name="plus"
                        rules={[
                            {
                                required: true,
                                message: 'Qancha qarz ayrishingizni kiriting...',
                            },
                        ]}

                    >
                        <Input onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, howmuchdebt: Number(e.target.value) })} type="number" value={ayiruvQiymat.howmuchdebt < 1 ? "" : ayiruvQiymat.howmuchdebt} placeholder='Qarzdan yechish' />
                    </Form.Item>

                    <Form.Item
                        name="info"
                        rules={[
                            {
                                required: true,
                                message: 'Nima sababdan qarzdan ayrimoqdasiz...?',
                            },
                        ]}

                    >
                        <Input required={true} type="text" onChange={(e) => setAyiruvQiymat({ ...ayiruvQiymat, info: e.target.value })} value={ayiruvQiymat.info.length < 1 ? "" : ayiruvQiymat.info} placeholder='Qarzdan yechish sabasi...' />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={ayirish} type='primary' htmlType="submit">Qarzdan yechish</Button>
                    </Form.Item>
                </Form>

                <Form initialValues={{
                    remember: true,
                }}
                    autoComplete="off">

                    <Form.Item
                        name="plus"
                        rules={[
                            {
                                required: true,
                                message: 'Qancha qarz qo`shishingizni kiriting...',
                            },
                        ]}

                    >
                        <Input className='inputdander' onChange={(e) => setQoshuvQiymat({ ...qoshuvQiymat, howmuchdebt: Number(e.target.value) })} type="number" value={qoshuvQiymat.howmuchdebt < 1 ? "" : qoshuvQiymat.howmuchdebt} placeholder='Qarz qo`shish' />
                    </Form.Item>

                    <Form.Item
                        name="info"
                        rules={[
                            {
                                required: true,
                                message: 'Nima sababdan qarzdan qoshmoqdasiz...?',
                            },
                        ]}

                    >
                        <Input type="text" className='inputdander' placeholder='Nimaga qarz qo`shmoqchisiz..' onChange={(e) => setQoshuvQiymat({ ...qoshuvQiymat, info: e.target.value })} value={qoshuvQiymat.info.length < 1 ? "" : qoshuvQiymat.info} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={qoshish} type='primary' htmlType="submit" danger>Qarzga qo'shish</Button>
                    </Form.Item>
                </Form></div>


            <div className="singlepage_main">
                <div className="singlepage_title">
                    <h3>Qarzdorning ismi: <span style={{ color: "#1677FF" }}> {userData.debtorname}</span></h3>
                    <h3>Jami qarzi: <span style={{ color: "red" }}>{userData.howmuchdebt}</span>  so`m</h3>
                    <Button onClick={deleteUser} danger>Qarzdorni o'chirish</Button>
                </div>
                <div className="single_container">
                    <Table dataSource={userData.info} className='tablesinlle'>
                        <Table.Column title="Miqdor" dataIndex="amount" key="amount" render={(text, record) => (
                            <span>{record && record.operation === "plus" ? "Qo'shilgan miqdor" : "Ayirilgan miqdor"}: {record && record.amount} so`m</span>
                        )} />
                        <Table.Column title="Nima olgan (yoki chiqargan)" dataIndex="info" key="info" />
                        <Table.Column title="Vaqti" dataIndex="updatedAt" key="updatedAt" render={(text, record) => (
                            <span>{record && (new Date(record.updatedAt)).toDateString()} {record && (new Date(record.updatedAt)).toLocaleTimeString()}</span>
                        )} />
                        {/* <Table.Column title='Delete' render={(text, record) => (
                            <button>Delete</button>
                        )} /> */}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Singlepage;
