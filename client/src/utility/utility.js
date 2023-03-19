import { http } from "../config";

export const getAllTodos = async () => {
  const response = await http.get("/");
  return response;
};
export const deleteTodo = async (id) => {
  const response = await http.delete(`/delete/${id}`);
  return response;
};
export const editTodo = async (id, title) => {
  const response = await http.put(
    `/edit/${id}`,
    JSON.stringify({ title: title })
  );
  return response;
};
