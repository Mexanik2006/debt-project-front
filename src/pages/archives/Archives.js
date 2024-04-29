import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../api/api';
import ListItems from './ListItems';

function Archives() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)
    const [archiveData, setArchiveData] = useState([]);
    const { user } = useAuthContext();
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/archives/get', {
            });
            setArchiveData(response.data);
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
            {archiveData.length < 1 ? <h1>Loading...</h1> :
                <div>
                    {archiveData.map(archive => <ListItems archivelist={archive} />)}
                </div>
            }
        </div>
    )
}

export default Archives