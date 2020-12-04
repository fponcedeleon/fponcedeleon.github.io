import { get } from "../api/api";
import configs from "../config/configs";

const baseUrl = configs.apiUrl;
const userUrl = 'api/provider';
const getAll = 'getAll';

export const getAllProviders = async () => {
  const { data: providers, error } = await get(`${baseUrl}/${userUrl}/${getAll}`);
  if (error) {
    throw error;
  }

  return providers;
};