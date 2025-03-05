import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://z-socialmedia.up.railway.app:5000/api",
  withCredentials: true,
});
