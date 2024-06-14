import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tarefa-backend.onrender.com',
});

export default api;
