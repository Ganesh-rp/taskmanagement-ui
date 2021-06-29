import axios from 'axios';


export const Post = async (data) => {
    console.log('--------data--------', data)
    await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/user/login`, { email: data.email, password: data.password })
    .then(res => {
      return res
    });
}
