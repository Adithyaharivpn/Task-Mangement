import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-mangement-7odw.onrender.com',
  withCredentials: true, 
});


export default api;
