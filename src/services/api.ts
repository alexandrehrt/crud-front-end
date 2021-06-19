import axios from 'axios';
// import { parseCookies } from 'nookies';

// const cookies = parseCookies();

const api = axios.create({
  baseURL: 'http://localhost:3333/',
  // headers: {
  //   Authorization: `Bearer ${cookies['socialmedia.token']}`,
  // },
});

export default api;
