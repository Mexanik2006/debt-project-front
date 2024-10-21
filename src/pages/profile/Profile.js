import { Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useAuthContext } from '../../hooks/useAuthContext';
import Axios from '../../api/api';

function Profile() {
    const { Title } = Typography;
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

    useEffect(() => {
        if (data?.role === "admin") {
            fetchData();
        } else {
            console.log("sizda root admin yoq")
        }
    }, [user]);
    return (
        <div>
            <Card className='card_settings'>
                <Title level={2} className='card_settings_title'>Sizning ma'lumotlaringiz</Title>

                {/* <div className="">
                    <UploadImagess />
                </div> */}

                <div className="profile_flex">
                    <div className="profile_none">
                        <h1>Ismingiz:</h1>
                    </div>
                    <div className="Profile_get">
                        <h1>{data.userName}</h1>
                    </div>
                </div>

                <div className="profile_flex">
                    <div className="profile_none">
                        <h1>Loginingiz:</h1>
                    </div>
                    <div className="Profile_get">
                        <h1>{data.userlogin}</h1>
                    </div>
                </div>


                <div className="profile_flex">
                    <div className="profile_none">
                        <h1>Emailingiz:</h1>
                    </div>
                    <div className="Profile_get">
                        <h1>{data.email}</h1>
                    </div>
                </div>


            </Card>
        </div>
    )
}

export default Profile