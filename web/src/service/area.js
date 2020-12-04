import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;

const areaURL = "api/area";

export const getAllAreas = async () => {
  const { data, error } = await get(`${baseUrl}/${areaURL}/getAll`);
  if (error) {
    throw error;
  }

  return data.items;
};
