import React, { useEffect, useState } from 'react';
import "./Main.css";
import axios from '../../api/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import Userslist from "../../Components/userslist/Userslist"
import Forms from "../../Components/form/Forms"
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Axios from '../../api/api';
import Admin from '../admin/Admin';
function Main() {
    const { user } = useAuthContext();
    const [data, setData] = useState([]);
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
    console.log(user)
    return (
        <div className='Main'>
            <div className="">
                <div className=''>
                    <div className="">
                        {data.role === 'admin' ? (
                            // <Button onClick={handleAdminLogout} danger type='primary' size='large' className='headerbtn'>Admin Chiqish</Button>
                            <Admin />
                        ) : (
                            <div className="">
                                    <div className="plas">
                                        <Forms />
                                    </div>
                                    <Userslist />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
