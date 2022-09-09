import axios from "axios";
import requests from "./requests";

const exportRowData = axios.create({
  baseURL: `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`,
});

export default exportRowData;
