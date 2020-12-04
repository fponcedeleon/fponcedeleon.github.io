import { get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";
const userURL = 'api/user';
const getAll = 'getAll';

export const getAllUsers = async () => {
  const { data, error } = await get(`${baseUrl}/${userURL}/${getAll}`);
  if (error) {
    throw error;
  }
  console.log("AGUANTE LA FAFA",data.items)
  return data.items;
};