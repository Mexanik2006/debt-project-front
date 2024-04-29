import React, { useContext, useEffect, useState } from 'react'
import "./Admin.js"
import axios from '../../api/api.js';
import { AuthContext } from '../../context/AuthContext.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { Link } from 'react-router-dom';
import ListItems from './ListItems.js';
function Admin() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const { user } = useAuthContext();
    // console.log(data)
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/user/getusers', {
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
            console.log('Error occurred while fetching data');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user?.role === "root") {
            fetchData();
        } else {
            console.log("sizda root admin yoq")
        }
    }, [user]);
    return (
        <div>
            <h1>Admin page</h1>
            {data.length < 1 ? <h1>Loading...</h1> :
                <div>
                    {data.map(useritem => <ListItems userlist={useritem} />)}
                </div>
            }
        </div>
    )
}

export default Admin