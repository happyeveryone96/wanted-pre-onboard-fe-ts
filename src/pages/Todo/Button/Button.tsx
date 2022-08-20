import React from 'react';
import css from './Button.module.scss';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import { SetterOrUpdater } from 'recoil';
interface ButtonProps {
  type: string;
  id?: number;
  setIsUpdated: SetterOrUpdater<boolean>;
  setNewTodo?: React.Dispatch<React.SetStateAction<string>>;
  setIsCompletedTodo?: React.Dispatch<React.SetStateAction<boolean>>;
  todo?: string;
  isCompleted?: boolean;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button(props: ButtonProps): JSX.Element {
  const {
    type,
    id,
    setIsUpdated,
    setNewTodo,
    setIsCompletedTodo,
    todo,
    isCompleted,
    setUpdate,
  } = props;

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

  const cancelBtn = () => {
    if (setUpdate && setNewTodo && todo && setIsCompletedTodo && isCompleted) {
      setUpdate(false);
      setNewTodo(todo);
      setIsCompletedTodo(isCompleted);
    }
  };

  const className: string = `${type}Btn`;
  let onClick;
  let text;
  if (type === 'delete') {
    onClick = deleteTodo;
    text = '삭제';
  } else if (type === 'cancel') {
    onClick = cancelBtn;
    text = '취소';
  }

  return (
    <button className={css[className]} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
