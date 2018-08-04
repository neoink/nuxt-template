import axios from 'axios';

const $axios = axios.create({
  baseURL: `https://${process.env.STARGATE_HOST}/api/${
    process.env.STARGATE_VERSION
  }`,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`
  },
  withCredentials: true
});

export default $axios;
