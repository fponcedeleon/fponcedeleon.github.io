import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;
const machineURL = 'api/machine';

export const createNewMachine = async (data) => {
  console.log('data', {...data});
  const { data: machine, error } = await post(`${baseUrl}/${machineURL}/create`, {
    ...data
  });

  if (error) {
    if (error.status === 409) {
      throw new Error("Machine already exists.");
    }
    throw error;
  }

  return machine;
};

export const getAllMachines = async () => {
  const { data, error } = await get(`${baseUrl}/${machineURL}/getAll`);
  if (error) {
    throw error;
  }
  
  return data.items;
};

export const getMachineById = async (id) => {
  const { data, error } = await get(`${baseUrl}/${machineURL}/${id}`);
  if (error) {
    throw error;
  }
  
  return data.items;
};