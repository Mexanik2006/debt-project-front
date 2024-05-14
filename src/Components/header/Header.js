import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';
import Axios from '../../api/api';
import { Button } from 'antd';
import { IoIosLogOut } from "react-icons/io";
import Admin from '../../pages/admin/Admin'
const Header = () => {
    const { user, dispatch } = useAuthContext();
    const [data, setData] = useState({});

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    const handleClick = () => {
        logout();
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

    const handleAdminLogout = () => {
        logout();
        // Additional logout logic if needed
    };

    const handleUserLogout = () => {
        logout();
        // Additional logout logic if needed
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Qarz daftari</h1>
                </Link>
                <nav>
                    {user ? (
                        <div className='headerright'>
                            <span style={{ fontSize: "23px", marginRight: '50px', textAlign: "center" }}>Salom <span style={{ fontWeight: "700", color: '#1677FF' }}>{data.userName}</span></span>
                            <div className="headerbtn">
                                {data.role === 'admin' ? (
                                    <Button onClick={handleAdminLogout} danger type='primary' size='large' className='headerbtn'>Admin Chiqish</Button>
                                    // <Admin />
                                ) : (
                                    <Button onClick={handleUserLogout} danger type='primary' size='large' className='headerbtn'>Chiqish</Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                                <Link to="/login">Login</Link>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    );
};

export default Header;
