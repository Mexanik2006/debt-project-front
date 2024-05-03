import Axios from '../../api/api';
import React, { useContext } from 'react';
import "./Form.css";
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { message } from 'antd';

function Forms() {
    const { setSensor } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    const success = async () => {
        await messageApi
            .open({
                type: 'loading',
                content: 'Ma`lumot yubotilmoqda...',
            })
            .then(() => message.success('Ma`lumot yuborildi'))
    };

    const error = async () => {
        await messageApi.open({
            type: 'error',
            content: 'Bu xatolik xabari',
        });
    };

    const { user } = useAuthContext();

    const sendForm = async (e) => {
        e.preventDefault();
        setSensor(false);
        const debtorname = e.target[0].value;
        const howmuchdebt = e.target[1].value;
        const whatcameout = e.target[2].value;
        const phonenumber = e.target[3].value;

        try {
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
            });
            success();
        } catch (err) {
            console.error(err);
            error();
        }

        setSensor(true);

        e.target[0].value = '';
        e.target[1].value = '';
        e.target[2].value = '';
        e.target[3].value = '';
    };

    return (
        <form className='form' onSubmit={sendForm}>
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
                {contextHolder}
                <button type="submit">Qo'shish</button>
            </div>
        </form>
    )
}

export default Forms;
