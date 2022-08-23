import React, { MouseEventHandler, useTransition } from 'react';
import css from './DeleteButton.module.scss';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { todoListState } from '../../../recoil/todo';
import { todoApi } from '../../../apis/Todo/todo';

interface DeleteButtonProps {
  id: number;
}

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);
  const [, startTransition] = useTransition();

  const deleteTodo: MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    await todoApi.deleteTodo(id);
    startTransition(() => refreshTodoList());
  };

  return (
    <button className={css.deleteBtn} onClick={deleteTodo}>
      삭제
    </button>
  );
}

export default DeleteButton;
