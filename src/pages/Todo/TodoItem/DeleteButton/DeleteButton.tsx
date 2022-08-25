import React, { useTransition } from 'react';
import css from './DeleteButton.module.scss';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { todoListState } from '../../../../recoil/todo';
import { todoApi } from '../../../../apis/Todo/todo';

interface DeleteButtonProps {
  id: number;
}

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);
  const [, startTransition] = useTransition();

  const deleteTodo = async () => {
    await todoApi.deleteTodo(id);
    startTransition(() => refreshTodoList());
  };

  return (
    <input
      type="button"
      className={css.deleteBtn}
      onClick={deleteTodo}
      alt="할 일 삭제 버튼"
      value="삭제"
    />
  );
}

export default DeleteButton;
