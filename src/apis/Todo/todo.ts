import { TodoEditParams, TodoCreateParams } from './types';
import instance from '../axios';

export const todoApi = {
  getTodos() {
    return instance.get('/todos');
  },
  createTodo(body: TodoCreateParams) {
    return instance.post('/todos', body);
  },
  deleteTodo(id: number) {
    return instance.delete(`/todos/${id}`);
  },
  updateTodo(id: number, body: TodoEditParams) {
    return instance.put(`/todos/${id}`, body);
  },
};
