import { http } from "../config";

export const getAllTodos = async () => {
  const response = await http.get("/");
  return response;
};
