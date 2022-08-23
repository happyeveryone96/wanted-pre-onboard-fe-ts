import { atom, selector } from 'recoil';
import { todoApi } from '../apis/Todo/todo';

export const todoState = atom({
  key: 'todoState',
  default: '',
});

export const todoListState = selector({
  key: 'todoListState',
  get: async () => {
    try {
      const { data } = await todoApi.getTodos();
      return data;
    } catch (err) {
      throw err;
    }
  },
});
