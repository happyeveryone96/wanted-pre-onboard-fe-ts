import React from 'react';
import css from './UpdateButton.module.scss';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { todoListState } from '../../../../recoil/todo';
import { todoApi } from '../../../../apis/Todo/todo';

interface ButtonProps {
  id: number;
  update: boolean;
  newTodo: string;
  isCompletedTodo: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button(props: ButtonProps) {
  const { id, update, newTodo, isCompletedTodo, setUpdate } = props;

  const updateBtn = () => {
    update ? updateTodo() : setUpdate!(true);
  };

  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);

  const updateTodo = async () => {
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
    <input
      type="button"
      className={css.updateBtn}
      onClick={updateBtn}
      alt={update ? '변경된 할 일 제출 버튼' : '할 일 수정 모드 전환 버튼'}
      value={update ? '제출' : '수정'}
    />
  );
}

export default Button;
