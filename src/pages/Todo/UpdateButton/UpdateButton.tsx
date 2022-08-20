import React from 'react';
import css from './UpdateButton.module.scss';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { updateState } from '../../../recoil/todo';

interface ButtonProps {
  id: number;
  update: boolean;
  newTodo: string;
  isCompletedTodo: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button(props: ButtonProps): JSX.Element {
  const { id, update, newTodo, isCompletedTodo, setUpdate } = props;
  const setIsUpdated = useSetRecoilState(updateState);
  const token = localStorage.getItem('token');

  const updateBtn = () => {
    update ? updateTodo() : setUpdate!(true);
  };

  const updateTodo = () => {
    if (newTodo !== '') {
      axios
        .put(
          `${BASE_URL}/todos/${id}`,
          {
            todo: newTodo,
            isCompleted: isCompletedTodo,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          if (res.status === 200) {
            setIsUpdated(true);
            setUpdate!(false);
          }
        });
    } else alert('할 일을 입력해주세요!');
  };

  return (
    <button className={css.updateBtn} onClick={updateBtn}>
      {update ? '제출' : '수정'}
    </button>
  );
}

export default Button;
