import React, { MouseEventHandler } from 'react';
import css from './DeleteButton.module.scss';
import { useSetRecoilState } from 'recoil';
import { updateState } from '../../../recoil/todo';
import { todoApi } from '../../../apis/Todo/todo';

interface DeleteButtonProps {
  id: number;
}

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const setIsUpdated = useSetRecoilState(updateState);

  const deleteTodo: MouseEventHandler<HTMLButtonElement> = (): void => {
    todoApi.deleteTodo(id).then(res => {
      if (res.status === 204) setIsUpdated(true);
    });
  };

  return (
    <button className={css.deleteBtn} onClick={deleteTodo}>
      삭제
    </button>
  );
}

export default DeleteButton;
