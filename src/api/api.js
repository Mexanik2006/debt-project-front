import axios from "axios";


// const instance = axios.create({
//     baseURL: 'http://localhost:5000'
// });
// const instance = axios.create({
//     baseURL: 'https://debt-project-backend.onrender.com'
// });
const instance = axios.create({
    baseURL: 'https://debt-project-backend.vercel.app/'
});

export default instance

