import axios, { AxiosInstance } from "axios";

export const getAxiosBackend = (accessToken: string) : AxiosInstance => axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
