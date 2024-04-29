import React, { useContext, useEffect, useState } from 'react';
import './Userslist.css';
import Axios from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';

function Userslist() {
    const [data, setData] = useState([]);
    const [isLoading] = useState(false);
    const { setIsLoading, setContextIsLoading, sensor, setSensor } = useContext(AuthContext);
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

    return (
        <ul className='userlist'>
            <h1>User lists</h1>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                data.map((user) => (
                    <li key={user._id}>
                        <div className='list_left'>
                            <span>
                                Ismi: <b>{user.debtorname}</b>
                            </span>
                            <span>
                                Qancha qarzi bor: <b style={{ color: 'red' }}>{user.howmuchdebt}</b>
                            </span>
                            <span>
                                Nima olgan: <b>{user.whatcameout}</b>
                            </span>
                        </div>

                        <div className='list_right'>
                            <a href={`tel:${user.number}`}>Telefon raqami: +{user.phonenumber}</a>
                            <Link className='link' to={`/debt/${user._id}`}>
                                Taxrirlash
                            </Link>
                            <button onClick={() => deleteUser(user._id)}>delete</button> {/* Fixing this line */}
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}

export default Userslist;
