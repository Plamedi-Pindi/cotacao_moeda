// Import axios
import axios from "axios";

// import Environment Variable
const apiEndpoint = import.meta.env.VITE_EXCHANGE_API_ENDPOINT
const accessKey = import.meta.env.VITE_EXCHANGE_ACCESS_KEY

const api = axios.create({
    baseURL: apiEndpoint,
    timeout: 5000,
    params: {
    access_key:accessKey
  }
});

export default api;