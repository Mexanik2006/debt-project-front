import axios from "axios";


// const instance = axios.create({
//     baseURL: 'http://localhost:5000'
// });
const instance = axios.create({
    baseURL: 'https://debt-project-backend.onrender.com'
});

export default instance

