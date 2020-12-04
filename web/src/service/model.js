import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;

const modelURL = "api/model";

export const getAllModels = async () => {
  const { data, error } = await get(`${baseUrl}/${modelURL}/getAll`);
  if (error) {
    throw error;
  }

  return data.items;
};
