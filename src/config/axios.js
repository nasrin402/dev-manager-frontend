import axios from "axios";

const isProduction = import.meta.env.PROD;

export const axiosPublicInstance = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL,
});

//const token = JSON.parse(localStorage.getItem('token'))

export const axiosPrivateInstance = (token) =>
  axios.create({
    baseURL: isProduction
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
