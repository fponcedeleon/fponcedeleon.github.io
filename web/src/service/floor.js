import { get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;
const floorURL = 'api/plant';
const getAll = 'getAll';

export const getAllFloors = async () => {
  const { data, error } = await get(`${baseUrl}/${floorURL}/${getAll}`);
  if (error) {
    throw error;
  }

  return data.items;
};