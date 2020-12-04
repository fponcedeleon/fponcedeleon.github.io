import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;

const sublevelURL = "api/sublevel";

export const getAllSublevels = async () => {
  const { data, error } = await get(`${baseUrl}/${sublevelURL}/getAll`);
  if (error) {
    throw error;
  }

  return data.items;
};
