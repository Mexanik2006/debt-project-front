import Axios from '../../api/api'
import React, { useContext, useState } from 'react'
import "./Form.css"
import { AuthContext } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'
function Forms() {
    const { isLoading, setIsLoading, sensor, setSensor } = useContext(AuthContext)

    const [debtorname, setdebtorname] = useState("");
    const [howmuchdebt, sethowmuchdebt] = useState("");
    const [whatcameout, setwhatcameout] = useState("");
    const [phonenumber, setphonenumber] = useState("");


    const { user } = useAuthContext()
    console.log(isLoading)
    const sendForm = async (e) => {
        e.preventDefault()
        setSensor(false)
        setIsLoading(true)
        let debtorname = e.target[0].value
        let howmuchdebt = e.target[1].value
        let whatcameout = e.target[2].value
        let phonenumber = e.target[3].value
        await Axios.post("/client/create", {
            debtorname,
            howmuchdebt,
            whatcameout,
            phonenumber,
            comments: [],
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => console.log(res))
            .catch(() => console.log("error chiqdi"))
        setIsLoading(false)
        setSensor(true)

        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
    }
    console.log(sendForm)


    return (
        <form className='form' action="" onSubmit={sendForm}>
            <div className="textm">
                <h3>Qarz qo'shish:</h3>
            </div>
            <div className="inputs">
                <input type="text" placeholder='Qarzdorning ismi' required />
                <input type="number" placeholder='Qancha qarz oldi (yoki boldi)' required />
                <input type="text" placeholder='Nima chiqardi (yoki oldi)' />
                <input type="number" placeholder='Telefon raqami' />

            </div>
            <div className="btn">
                <button>Qo'shish</button>
            </div>
        </form>
    )
}

export default Forms