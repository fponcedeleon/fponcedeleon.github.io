import { post, get } from "../api/api";
import configs from "../config/configs";

const baseUrl = "http://localhost:4000"; //configs.apiUrl;

const pieceURL = "api/piece";

export const getAllPieces = async () => {
  const { data, error } = await get(`${baseUrl}/${pieceURL}/getAll`);
  if (error) {
    throw error;
  }

  return data.items;
};

export const createNewPieces = async (data) => {
  console.log("pieces at service", data);
  const { data: pieces, error } = await post(`${baseUrl}/${pieceURL}/create`, {
    ...data,
  });

  if (error) {
    if (error.status === 409) {
      throw new Error("Some of the components already exist.");
    }
    throw error;
  }

  return pieces;
};
