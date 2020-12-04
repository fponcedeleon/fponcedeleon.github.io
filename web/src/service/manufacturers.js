import { get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;
const manufacturerURL = 'api/manufacturer';
const getAll = 'getAll';

export const getAllManufacturers = async () => {
  const { data, error } = await get(`${baseUrl}/${manufacturerURL}/${getAll}`);
  if (error) {
    throw error;
  }

  return data.items;
};