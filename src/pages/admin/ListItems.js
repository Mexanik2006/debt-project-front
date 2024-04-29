import axios from '../../api/api'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function ListItems({ userlist }) {
    const { setIsLoading, setSensor } = useContext(AuthContext)
    // const inputFunction = (e) => {
    //     console.log(e.target.checked)
    //     console.log(userlist._id)
    // }
    const inputFunction = async (e) => {
        setSensor(false)
        setIsLoading(true)
        console.log(e.target.checked)
        let checked = e.target.checked
        await axios.put(`/user/updateuser/${userlist._id}`, { isAllowed: checked })
            .then(res => console.log(res))
            .catch((error) => console.log("error bor", error))
        setIsLoading(false)
        setSensor(true)

    }
    return (
        <li>
            <Link to={`/singleuser/${userlist._id}`}>
                <h1>{userlist.email}</h1>
            </Link>
            <input type="checkbox" onChange={inputFunction} />
        </li>
    )
}

export default ListItems