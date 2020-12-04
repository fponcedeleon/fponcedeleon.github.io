import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000"; //configs.apiUrl;

const componentURL = "api/component";

export const getAllComponents = async () => {
  const { data, error } = await get(
    `${baseUrl}/${componentURL}/getAll`
  );
  if (error) {
    throw error;
  }
  console.log("DATA",data.items)
  return data.items;
};

export const createNewComponents = async (data) => {
  console.log("components at service", data);
  const { data: components, error } = await post(
    `${baseUrl}/${componentURL}/create`,
    {
      ...data,
    }
  );

  if (error) {
    if (error.status === 409) {
      throw new Error("Some of the components already exist.");
    }
    throw error;
  }

  return components;
};
