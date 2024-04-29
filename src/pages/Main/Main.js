import React, { useEffect } from 'react';
import "./Main.css";
import axios from '../../api/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import Userslist from "../../Components/userslist/Userslist"
import Forms from "../../Components/form/Forms"
function Main() {
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('/client/get', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });

                const json = response.data;
                console.log(json);
            } catch (error) {
                console.log('Error occurred while fetching workouts:', error);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    return (
        <div className='Main'>
            <div className="plas">
                <Forms />
            </div>
            <Userslist />
        </div>
    );
}

export default Main;
