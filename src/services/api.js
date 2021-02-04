import axios from "axios";

const api = axios.create({
  baseURL: "https://growdevers-api.herokuapp.com",
});

export default api;
