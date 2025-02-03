import axios from "axios";

const token = localStorage.getItem('authToken') || "";
const API_URL = process.env.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
