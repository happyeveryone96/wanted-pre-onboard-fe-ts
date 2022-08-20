import React, { MouseEventHandler } from 'react';
import css from './CancelButton.module.scss';

interface CancelButtonProps {
  todo: string;
  isCompleted: boolean;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  setIsCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function CancelButton(props: CancelButtonProps) {
  const { todo, isCompleted, setNewTodo, setIsCompletedTodo, setUpdate } =
    props;

  const cancelBtn: MouseEventHandler<HTMLButtonElement> = () => {
    setNewTodo(todo);
    setIsCompletedTodo(isCompleted);
    setUpdate(false);
  };

  return (
    <button className={css.cancelBtn} onClick={cancelBtn}>
      취소
    </button>
  );
}

export default CancelButton;
