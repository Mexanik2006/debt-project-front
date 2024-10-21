import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import Axios from '../../api/api';
import { Button, Dropdown, Space } from 'antd';
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import Admin from '../../pages/admin/Admin';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import { CgProfile } from 'react-icons/cg';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

const Header = () => {
    const { user, dispatch } = useAuthContext();
    const [data, setData] = useState({});

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const fetchData = async () => {
        try {
            const response = await Axios.get('/api/get', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const items = [
        {
            key: '1',
            label: (
                <Link to={"/profile"}>
                    Profile
                </Link>
            ),
            icon: <CgProfile />
        },
        // {
        //     key: '2',
        //     label: (
        //         <Link to={"/setting"}>
        //             Sozlamalar
        //         </Link>
        //     ),
        //     icon: <IoMdSettings />
        //     // disabled: true,
        // },
        // {
        //     key: '3',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        //             3rd menu item (disabled)
        //         </a>
        //     ),
        //     disabled: true,
        // },
        {
            key: '4',
            danger: true,
            label: 'Chiqish',
            icon: <FaArrowRightFromBracket />,
            onClick: logout,
        },
    ];

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Qarz daftari</h1>
                </Link>
                <nav>
                    {user ? (
                        <div className='headerright'>
                            <span style={{ fontSize: "23px", marginRight: '50px', textAlign: "center" }}>
                                Salom <span style={{ fontWeight: "700", color: '#1677FF' }}>{data.userName}</span>
                            </span>
                            <div className="headerbtn">
                                {data.role === 'admin' ? (
                                    <Button onClick={logout} danger type='primary' size='large' className='headerbtn'>
                                        Admin Chiqish
                                    </Button>
                                ) : (
                                        <Dropdown menu={{ items }} trigger={['click']} className='header_profile'>
                                            <Button type='primary' className='headerbtnn' onClick={(e) => e.preventDefault()}>
                                                <FaUserAlt />
                                            </Button>
                                        </Dropdown>

                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                                <Link to="/login">Kirish</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
