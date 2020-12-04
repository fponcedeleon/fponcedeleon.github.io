import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000";//configs.apiUrl;

const faultURL = "api/fault";

export const createNewFault = async (faultData) => {
  console.log(baseUrl);
  console.log(`${baseUrl}/${faultURL}`);
  const { data: fault, error } = await post(`${baseUrl}/${faultURL}/create`, {
    ...faultData,
  });

  if (error) {
    if (error.status === 409) {
      throw new Error("Fault already exists.");
    }
    throw error;
  }

  return fault;
};

export const getAllFaults = async () => {
  const { data: faults, error } = await get(`${baseUrl}/${faultURL}`);
  if (error) {
    throw error;
  }

  return faults;
};
