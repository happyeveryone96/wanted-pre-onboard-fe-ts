import React, { MouseEventHandler } from 'react';
import css from './UpdateButton.module.scss';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { todoListState } from '../../../recoil/todo';
import { todoApi } from '../../../apis/Todo/todo';

interface ButtonProps {
  id: number;
  update: boolean;
  newTodo: string;
  isCompletedTodo: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button(props: ButtonProps): JSX.Element {
  const { id, update, newTodo, isCompletedTodo, setUpdate } = props;

  const updateBtn: MouseEventHandler<HTMLButtonElement> = (): void => {
    update ? updateTodo() : setUpdate!(true);
  };

  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);

  const updateTodo = async (): Promise<void> => {
    try {
      await todoApi.updateTodo(id, {
        todo: newTodo,
        isCompleted: isCompletedTodo,
      });
      refreshTodoList();
      setUpdate!(false);
    } catch {
      alert('할 일을 입력해주세요!');
    }
  };

  return (
    <button className={css.updateBtn} onClick={updateBtn}>
      {update ? '제출' : '수정'}
    </button>
  );
}

export default Button;
