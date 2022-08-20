import React from 'react';
import css from './DeleteButton.module.scss';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { updateState } from '../../../recoil/todo';

interface DeleteButtonProps {
  id: number;
}

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const setIsUpdated = useSetRecoilState(updateState);

  const token = localStorage.getItem('token');
  const deleteTodo = (): void => {
    axios
      .delete(`${BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
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
