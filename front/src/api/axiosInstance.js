import axios from "axios";

const token = localStorage.getItem('authToken') || "";
const API_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
