import axios from '../../api/api'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function ListItems({ archivelist }) {
    const { setIsLoading, setSensor } = useContext(AuthContext)

    console.log(archivelist)
    return (
        <li>
            <span>{archivelist.archive.name}</span> <span>{archivelist.archive.qarz}</span><a href={`tel:+998${archivelist.archive.number}`}>{archivelist.archive.number}</a>
            {/* <Link to={`/singleuser/${userlist._id}`}>
                <h1>{archivelist.email}</h1>
            </Link> */}

        </li>
    )
}

export default ListItems