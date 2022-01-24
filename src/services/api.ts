import axios from "axios";

export const api = axios.create({
  baseURL: "https://my-burguer-api.herokuapp.com/",
});
