import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;

const makeURL = "api/make";

export const getAllMakes = async () => {
  const { data, error } = await get(`${baseUrl}/${makeURL}/getAll`);
  if (error) {
    throw error;
  }

  return data.items;
};
