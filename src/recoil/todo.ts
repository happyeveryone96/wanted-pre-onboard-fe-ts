import { atom } from 'recoil';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  setIsUpdated: any;
}

export const todoState = atom<string>({
  key: 'todoState',
  default: '',
});

export const updateState = atom<boolean>({
  key: 'updateState',
  default: false,
});

export const todoListState = atom<TodoProps[]>({
  key: 'todoListState',
  default: [],
});
