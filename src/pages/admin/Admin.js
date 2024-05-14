import React, { useContext, useEffect, useState } from 'react'
import "./Admin.js"
import Axios from '../../api/api.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { Link } from 'react-router-dom';

function Admin() {
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
            <h1>Salom {data.userName} siz admin ekansiz</h1>
            {/* <span>{data.userName}</span> */}

            <div className="">
                Foydalanuvchi yaratmoqchi bo'lsangiz <Link to={'/signup'}>Shuni bosing</Link>
            </div>
            {/* {data.length < 1 ? <h1>Loading...</h1> :
                <div>
                    {data.map(useritem => <ListItems userlist={useritem} />)}
                </div>
            } */}
        </div>
    )
}

export default Admin